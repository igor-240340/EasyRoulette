import { assert, log } from "cc";

import { assertStrictEqual } from "../Helper";

import BetTable from "../Bets/BetTable";
import BetType from "../Bets/BetType";

export default class BetTableTest {
    runAll() {
        log('BetTableTest')

        this.onBetButtonClick()
        this.getTotalPayoutTest()

        this.doubleAll_balanceAfter()
        this.doubleAll()

        this.undoLastBet_single()
        this.undoLastBet_double()
    }

    private onBetButtonClick() {
        log('onBetButtonClick')

        const betTable = new BetTable()
        const prevBalance = betTable.balance = 100
        const betSum = 5

        betTable.setChipValue(betSum)
        betTable.onBetButtonClick(BetType.Red, undefined)
        const newBalance = betTable.balance
        assertStrictEqual(newBalance, prevBalance - betSum)
    }

    private getTotalPayoutTest() {
        log('getTotalPayoutTest')

        const betTable = new BetTable()
        betTable.balance = 100

        const redBetSum = 5
        const evenBetSum = 25
        const totalWinPayout = redBetSum * 2 + evenBetSum * 2
        const winNumberRedEven = 12

        betTable.setChipValue(redBetSum)
        betTable.onBetButtonClick(BetType.Red, undefined)

        betTable.setChipValue(evenBetSum)
        betTable.onBetButtonClick(BetType.Even, undefined)

        const prevBalance = betTable.balance
        const totalPayout = betTable.getTotalPayout(winNumberRedEven)
        assertStrictEqual(totalPayout, totalWinPayout)
        assertStrictEqual(betTable.balance, prevBalance + totalWinPayout)
    }

    private doubleAll_balanceAfter() {
        log('doubleAll_balanceAfter')

        const betTable = new BetTable()
        betTable.balance = 100

        const betSum = 5
        betTable.setChipValue(betSum)
        betTable.onBetButtonClick(BetType.Red, undefined)
        const prevBalance = betTable.balance

        betTable.doubleAll()
        assertStrictEqual(betTable.balance, prevBalance - betSum)
    }

    private doubleAll() {
        log('doubleAll')

        const betTable = new BetTable()
        betTable.balance = 100

        const redBetSum = 5
        const evenBetSum = 25
        const redBetSumDoubled = redBetSum * 2
        const evenBetSumDoubled = evenBetSum * 2
        const totalWinPayout = redBetSumDoubled * 2 + evenBetSumDoubled * 2
        const winNumberRedEven = 12

        betTable.setChipValue(redBetSum)
        betTable.onBetButtonClick(BetType.Red, undefined)

        betTable.setChipValue(evenBetSum)
        betTable.onBetButtonClick(BetType.Even, undefined)

        betTable.doubleAll()

        const prevBalance = betTable.balance
        const totalPayout = betTable.getTotalPayout(winNumberRedEven)
        assertStrictEqual(totalPayout, totalWinPayout)
        assertStrictEqual(betTable.balance, prevBalance + totalWinPayout)
    }

    private undoLastBet_single() {
        log('undoLastBet_single')

        const betTable = new BetTable()
        const initialBalance = betTable.balance = 100

        betTable.setChipValue(5)
        betTable.onBetButtonClick(BetType.Straight, '1')

        betTable.undoLastBet()
        assertStrictEqual(betTable.balance, initialBalance)

        const payout = betTable.getTotalPayout(1)
        assertStrictEqual(payout, 0)
    }

    private undoLastBet_double() {
        log('undoLastBet_double')

        const betSum1 = 5
        const betSum2 = 25
        const betSum3 = 100 // Это максимальная ставка на текущий момент.

        const betTable = new BetTable()
        betTable.balance = 300          // Чтобы хватило на ставки и удвоение.

        betTable.setChipValue(betSum1)
        betTable.onBetButtonClick(BetType.Red, undefined)

        betTable.setChipValue(betSum2)
        betTable.onBetButtonClick(BetType.Even, undefined)

        // Делаем максимальную, чтобы на ставке не сработало удвоение.
        betTable.setChipValue(betSum3)
        betTable.onBetButtonClick(BetType.Straight, '0')

        // Должен удвоить только первые две ставки.
        betTable.doubleAll()

        const balanceBeforeUndo = betTable.balance

        // Должен одним разом отменить удвоение последних двух ставок
        betTable.undoLastBet()
        assertStrictEqual(betTable.balance, balanceBeforeUndo + betSum1 + betSum2)

        const winNumberRedEven = 12
        const totalPayout = betTable.getTotalPayout(winNumberRedEven)
        assertStrictEqual(totalPayout, betSum1 * 2 + betSum2 * 2)
    }
}