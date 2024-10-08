import { assert, log } from "cc";

import { assertStrictEqual } from "../Helper";

import BetTable from "../Bets/BetTable";
import BetType from "../Bets/BetType";
import TestBetLimitConfig from "../Bets/BetLimits/TestBetLimitConfig";
import DefaultBetLimitConfig from "../Bets/BetLimits/DefaultBetLimitConfig";

export default class BetTableTest {
    private testBetLimitConfig = new TestBetLimitConfig();

    runAll() {
        log('BetTableTest');

        this.onBetButtonClick();
        this.getTotalPayoutTest();

        this.doubleAll_balanceAfter();
        this.doubleAll();

        this.undoLastBet_single();
        this.undoLastBet_double();
        this.undoLastBet_nothingDoubled();

        this.createTableWithDefaultLimitConfig();
        this.setNewBetLimitConfigOnTable();
    }

    private onBetButtonClick() {
        log('onBetButtonClick');

        const betTable = new BetTable(this.testBetLimitConfig);
        const prevBalance = betTable.balance = 100;
        const betSum = 5;

        betTable.setChipValue(betSum);
        betTable.onBetButtonClick(BetType.Red, undefined);
        const newBalance = betTable.balance;
        assertStrictEqual(newBalance, prevBalance - betSum);
    }

    private getTotalPayoutTest() {
        log('getTotalPayoutTest');

        const betTable = new BetTable(this.testBetLimitConfig);
        betTable.balance = 100;

        const redBetSum = 5;
        const evenBetSum = 25;
        const totalWinPayout = redBetSum * 2 + evenBetSum * 2;
        const winNumberRedEven = 12;

        betTable.setChipValue(redBetSum);
        betTable.onBetButtonClick(BetType.Red, undefined);

        betTable.setChipValue(evenBetSum);
        betTable.onBetButtonClick(BetType.Even, undefined);

        const prevBalance = betTable.balance;
        const totalPayout = betTable.getTotalPayout(winNumberRedEven);
        assertStrictEqual(totalPayout, totalWinPayout);
        assertStrictEqual(betTable.balance, prevBalance + totalWinPayout);
    }

    private doubleAll_balanceAfter() {
        log('doubleAll_balanceAfter');

        const betTable = new BetTable(this.testBetLimitConfig);
        betTable.balance = 100;

        const betSum = 5;
        betTable.setChipValue(betSum);
        betTable.onBetButtonClick(BetType.Red, undefined);
        const prevBalance = betTable.balance;

        betTable.doubleAll();
        assertStrictEqual(betTable.balance, prevBalance - betSum);
    }

    private doubleAll() {
        log('doubleAll');

        const betTable = new BetTable(this.testBetLimitConfig);
        betTable.balance = 100;

        const redBetSum = 5;
        const evenBetSum = 25;
        const redBetSumDoubled = redBetSum * 2;
        const evenBetSumDoubled = evenBetSum * 2;
        const totalWinPayout = redBetSumDoubled * 2 + evenBetSumDoubled * 2;
        const winNumberRedEven = 12;

        betTable.setChipValue(redBetSum);
        betTable.onBetButtonClick(BetType.Red, undefined);

        betTable.setChipValue(evenBetSum);
        betTable.onBetButtonClick(BetType.Even, undefined);

        betTable.doubleAll();

        const prevBalance = betTable.balance;
        const totalPayout = betTable.getTotalPayout(winNumberRedEven);
        assertStrictEqual(totalPayout, totalWinPayout);
        assertStrictEqual(betTable.balance, prevBalance + totalWinPayout);
    }

    private undoLastBet_single() {
        log('undoLastBet_single');

        const betTable = new BetTable(this.testBetLimitConfig);
        const initialBalance = betTable.balance = 100;

        betTable.setChipValue(5);
        betTable.onBetButtonClick(BetType.Straight, '1');

        betTable.undoLastBet();
        assertStrictEqual(betTable.balance, initialBalance);

        const payout = betTable.getTotalPayout(1);
        assertStrictEqual(payout, 0);
    }

    private undoLastBet_double() {
        log('undoLastBet_double');

        const betSum1 = 5;
        const betSum2 = 25;
        const betSum3 = 100; // Это максимальная ставка на текущий момент.

        const betTable = new BetTable(this.testBetLimitConfig);
        betTable.balance = 300;          // Чтобы хватило на ставки и удвоение.

        betTable.setChipValue(betSum1);
        betTable.onBetButtonClick(BetType.Red, undefined);

        betTable.setChipValue(betSum2);
        betTable.onBetButtonClick(BetType.Even, undefined);

        // Делаем максимальную, чтобы на ставке не сработало удвоение.
        betTable.setChipValue(betSum3);
        betTable.onBetButtonClick(BetType.Straight, '0');

        // Должен удвоить только первые две ставки.
        betTable.doubleAll();

        const balanceBeforeUndo = betTable.balance;

        // Должен одним разом отменить удвоение последних двух ставок
        betTable.undoLastBet();
        assertStrictEqual(betTable.balance, balanceBeforeUndo + betSum1 + betSum2);

        const winNumberRedEven = 12;
        const totalPayout = betTable.getTotalPayout(winNumberRedEven);
        assertStrictEqual(totalPayout, betSum1 * 2 + betSum2 * 2);
    }

    private undoLastBet_nothingDoubled() {
        log('undoLastBet_nothingDoubled');

        const betSum = 25;

        const betTable = new BetTable(this.testBetLimitConfig);
        betTable.balance = 30;

        betTable.setChipValue(betSum);
        betTable.onBetButtonClick(BetType.Red, undefined);

        // Текущая ставка равна 25.
        // На ней есть пространство для удвоения, но баланс равен 5 и меньше ставки,
        // поэтому удвоения не происходит.
        betTable.doubleAll();

        const balanceBeforeUndo = betTable.balance;

        // Поскольку ни одна ставка не удвоилась,
        // то последний возврат должен произойти сразу по первой ставке.
        betTable.undoLastBet();
        assertStrictEqual(betTable.balance, balanceBeforeUndo + betSum);

        const winNumberRed = 12;
        const totalPayout = betTable.getTotalPayout(winNumberRed);
        assertStrictEqual(totalPayout, 0);
    }

    // 
    // Тесты с разными конфигурациями лимитов.
    // 

    private createTableWithDefaultLimitConfig() {
        log('createTableWithSpecificLimitConfig');

        const betTable = new BetTable(this.testBetLimitConfig);

        // TODO: проверить, что все ставки внутри стола получают правильные лимиты.
        assert(false);
    }

    private setNewBetLimitConfigOnTable() {
        log('setNewBetLimitConfigOnTable');

        const betTable = new BetTable(this.testBetLimitConfig);
        const inititalBalance = betTable.balance = 100; // Меньше минимальной ставки.
        // betTable.setChipValue(5);
        // betTable.onBetButtonClick(BetType.Red, undefined);

        const defaultBetLimitConfig = new DefaultBetLimitConfig();
        betTable.setNewBetLimitConfig(defaultBetLimitConfig);
        betTable.setChipValue(5); // Меньше минимальной ставки.
        betTable.onBetButtonClick(BetType.Red, undefined);
        assertStrictEqual(betTable.balance, inititalBalance);

        // TODO: проверить, что лимиты по всем ставкам обновились.
        // TODO: проверить, что если при переключении на столе уже были ставки, то предварительно произошел их возврат.
        assert(false);
    }
}