import { _decorator, Component, log, Node } from 'cc';
const { ccclass, property } = _decorator;

import assert from '../Helper'
import { assertStrictEqual } from '../Helper'

import Bet from '../Bets/Bet';

// Внутренние ставки.
import StraightBet from '../Bets/InsideBets/StraightBet';
import SplitBet from '../Bets/InsideBets/SplitBet';
import StreetBet from '../Bets/InsideBets/StreetBet';
import CornerBet from '../Bets/InsideBets/CornerBet';
import LineBet from '../Bets/InsideBets/LineBet';

// Внешние ставки.
import RedBet from '../Bets/OutsideBets/RedBet';
import BlackBet from '../Bets/OutsideBets/BlackBet';
import EvenBet from '../Bets/OutsideBets/EvenBet';
import OddBet from '../Bets/OutsideBets/OddBet';
import LowBet from '../Bets/OutsideBets/LowBet';
import HighBet from '../Bets/OutsideBets/HighBet';
import Column1stBet from '../Bets/OutsideBets/Column1stBet';
import Column2ndBet from '../Bets/OutsideBets/Column2ndBet';
import Column3rdBet from '../Bets/OutsideBets/Column3rdBet';
import Dozen1stBet from '../Bets/OutsideBets/Dozen1stBet';
import Dozen2ndBet from '../Bets/OutsideBets/Dozen2ndBet';
import Dozen3rdBet from '../Bets/OutsideBets/Dozen3rdBet';

import BetTableTest from './BetTableTest';

const BALANCE = 100
const MIN_BET = 5
const MAX_BET = 100

@ccclass('BetTest')
export class BetTest extends Component {
    private betTableTest = new BetTableTest()

    start() {
        this.test_Bet();

        this.testInsideBets();
        this.testOutsideBets();
        // this.testInvalidBetNumber();


        this.betTableTest.runAll()
    }

    /**
     * Тесты базового класса.
     */
    private test_Bet() {
        this.test_Bet_constructor()
        this.test_Bet_increase()
        this.test_Bet_double()
        this.test_Bet_revertLastIncrease()

        this.test_Bet_getPayout()
    }

    private test_Bet_constructor() {
        console.log('test_Bet_constructor');

        const invalidNumber1 = Bet.MIN_NUMBER - 1
        const invalidNumber2 = Bet.MAX_NUMBER + 1

        let didNotAcceptInvalidNumber = false
        try {
            new StraightBet(MIN_BET, MAX_BET, [invalidNumber1])
        }
        catch (e) {
            didNotAcceptInvalidNumber = true
        }
        assert(didNotAcceptInvalidNumber)

        didNotAcceptInvalidNumber = false
        try {
            new StraightBet(MIN_BET, MAX_BET, [invalidNumber2])
        }
        catch (e) {
            didNotAcceptInvalidNumber = true
        }
        assert(didNotAcceptInvalidNumber)
    }

    //
    // Bet.increase().
    //
    private test_Bet_increase() {
        console.log('test_Bet_increase')

        this.test_Bet_increase_1()
        this.test_Bet_increase_2()

        this.test_Bet_increase_3()
        this.test_Bet_increase_4()

        this.test_Bet_increase_5()
        this.test_Bet_increase_6()

        this.test_Bet_increase_7()
    }

    //
    // Баланса достаточно для покрытия текущего лимита ставки.
    // Номинал фишки не превышает текущий лимит.
    // Сделать ставку на номинал фишки.
    //
    private test_Bet_increase_1() {
        console.log('test_Bet_increase_1')

        const betMin = 5
        const betMax = 100
        const balance = betMax
        const chipValue = betMax

        const redBet = new RedBet(betMin, betMax)

        const actualIncrease = redBet.increase(chipValue, balance)
        assert(actualIncrease === chipValue)

        assert(redBet.sum === chipValue)
    }

    //
    // Баланса достаточно для покрытия текущего лимита ставки.
    // Номинал фишки превышает текущий лимит.
    // Сделать ставку на величину лимита.
    //
    private test_Bet_increase_2() {
        console.log('test_Bet_increase_2')

        const betMin = 5
        const betMax = 100
        const balance = betMax
        const chipValue = betMax * 2

        const redBet = new RedBet(betMin, betMax)

        const actualIncrease = redBet.increase(chipValue, balance)
        assert(actualIncrease === betMax)

        assert(redBet.sum === betMax)
    }

    //
    // Баланса не достаточно для покрытия текущего лимита ставки.
    // Номинал фишки не превышает баланса.
    // Сделать ставку на величину фишки.
    //
    private test_Bet_increase_3() {
        console.log('test_Bet_increase_3')

        const betMin = 5
        const betMax = 100
        const balance = betMax / 2
        const chipValue = balance

        const redBet = new RedBet(betMin, betMax)

        const actualIncrease = redBet.increase(chipValue, balance)
        assert(actualIncrease === chipValue)

        assert(redBet.sum === chipValue)
    }

    //
    // Баланса не достаточно для покрытия текущего лимита ставки.
    // Номинал фишки превышает баланс.
    // Сделать ставку на величину баланса.
    //
    private test_Bet_increase_4() {
        console.log('test_Bet_increase_4')

        const betMin = 5
        const betMax = 100
        const balance = betMax / 2
        const chipValue = balance * 2

        const redBet = new RedBet(betMin, betMax)

        const actualIncrease = redBet.increase(chipValue, balance)
        assert(actualIncrease === balance)

        assert(redBet.sum === balance)
    }

    //
    // Баланса не достаточно для минимальной ставки.
    // Не делать ставку.
    //
    private test_Bet_increase_5() {
        console.log('test_Bet_increase_5')

        const betMin = 5
        const betMax = 100
        const balance = betMin - 1
        const chipValue = betMin

        const redBet = new RedBet(betMin, betMax)

        const actualIncrease = redBet.increase(chipValue, balance)
        assert(actualIncrease === 0)

        assert(redBet.sum === 0)
    }

    //
    // Баланса достаточно для минимальной ставки.
    // Номинал фишки меньше минимальной ставки.
    // Сделать ставку на величину минимальной ставки.
    //
    private test_Bet_increase_6() {
        console.log('test_Bet_increase_6')

        const betMin = 5
        const betMax = 100
        const balance = betMin
        const chipValue = 1

        const redBet = new RedBet(betMin, betMax)

        const actualIncrease = redBet.increase(chipValue, balance)
        assert(actualIncrease === betMin)

        assert(redBet.sum === betMin)
    }

    //
    // Ставка достигла лимита.
    // Не делать ставку.
    //
    private test_Bet_increase_7() {
        console.log('test_Bet_increase_7')

        const betMin = 5
        const betMax = 100
        const balance = betMax
        const chipValue = betMax

        const redBet = new RedBet(betMin, betMax)
        redBet.increase(betMax, balance)

        const actualIncrease = redBet.increase(1, balance)
        assert(actualIncrease === 0)
    }

    //
    // Bet.double().
    //
    private test_Bet_double() {
        console.log('test_Bet_double')

        this.test_Bet_double_1()
        this.test_Bet_double_2()
        this.test_Bet_double_3()
        this.test_Bet_double_4()

        this.test_Bet_double_5()
        this.test_Bet_double_6()
    }

    //
    // Физически возможно удвоить ставку - текущий лимит не меньше текущей ставки.
    // Баланса достаточно.
    // Удвоить ставку.
    //
    private test_Bet_double_1() {
        console.log('test_Bet_double_1')

        const betMin = 5
        const betMax = 100
        let balance = betMax
        const chipValue = betMax / 2

        const redBet = new RedBet(betMin, betMax)
        balance -= redBet.increase(chipValue, balance)
        const prevBetSum = redBet.sum

        const actualIncrease = redBet.double(balance)
        assert(actualIncrease === prevBetSum)

        assert(redBet.sum === prevBetSum * 2)
    }

    //
    // Физически возможно удвоить ставку - текущий лимит не меньше текущей ставки.
    // Баланса не достаточно.
    // Не изменять ставку.
    //
    private test_Bet_double_2() {
        console.log('test_Bet_double_2')

        const betMin = 5
        const betMax = 100
        let balance = betMax - 10
        const chipValue = betMax / 2

        const redBet = new RedBet(betMin, betMax)
        balance -= redBet.increase(chipValue, balance)
        const prevBetSum = redBet.sum

        const actualIncrease = redBet.double(balance)
        assert(actualIncrease === 0)

        assert(redBet.sum === prevBetSum)
    }

    //
    // Физически невозможно удвоить ставку - текущий лимит меньше текущей ставки.
    // Баланса достаточно чтобы покрыть лимит.
    // Довести ставку до лимита.
    //
    private test_Bet_double_3() {
        console.log('test_Bet_double_3')

        const betMin = 5
        const betMax = 100
        let balance = betMax
        const chipValue = 60

        const redBet = new RedBet(betMin, betMax)
        balance -= redBet.increase(chipValue, balance)
        const prevBetSum = redBet.sum

        const actualIncrease = redBet.double(balance)
        assert(actualIncrease === 40)

        assert(redBet.sum === betMax)
    }

    //
    // Физически невозможно удвоить ставку - текущий лимит меньше текущей ставки.
    // Баланса не достаточно чтобы покрыть лимит.
    // Не изменять ставку.
    //
    private test_Bet_double_4() {
        console.log('test_Bet_double_4')

        const betMin = 5
        const betMax = 100
        let balance = betMax - 10
        const chipValue = 60

        const redBet = new RedBet(betMin, betMax)
        balance -= redBet.increase(chipValue, balance)
        const prevBetSum = redBet.sum

        const actualIncrease = redBet.double(balance)
        assert(actualIncrease === 0)

        assert(redBet.sum === redBet.sum)
    }

    //
    // Ставка нулевая.
    // Не изменять ставку.
    //
    private test_Bet_double_5() {
        console.log('test_Bet_double_5')

        const betMin = 5
        const betMax = 100
        const balance = betMax

        const redBet = new RedBet(betMin, betMax)

        const actualIncrease = redBet.double(balance)
        assert(actualIncrease === 0)

        assert(redBet.sum === 0)
    }

    //
    // Ставка достигла лимита.
    // Не изменять ставку.
    //
    private test_Bet_double_6() {
        console.log('test_Bet_double_6')

        const betMin = 5
        const betMax = 100
        const balance = betMax
        const chipValue = betMax

        const redBet = new RedBet(betMin, betMax)
        redBet.increase(chipValue, balance)

        const actualIncrease = redBet.double(balance)
        assert(actualIncrease === 0)

        assert(redBet.sum === betMax)
    }

    //
    // Bet.revertLastIncrease().
    //
    private test_Bet_revertLastIncrease() {
        console.log('test_Bet_revertLastIncrease')

        this.test_Bet_revertLastIncrease_1()
        this.test_Bet_revertLastIncrease_2()
    }

    //
    // Нулевая ставка.
    // Не делать отмену.
    //
    private test_Bet_revertLastIncrease_1() {
        console.log('test_Bet_revertLastIncrease_1')

        const redBet = new RedBet(5, 100)

        const revertedSum = redBet.revertLastIncrease()
        assert(revertedSum === 0)

        assert(redBet.sum === 0)
    }

    //
    // Не нулевая ставка и удвоение.
    // Сделать отмену в порядке обратном изменению ставок.
    //
    private test_Bet_revertLastIncrease_2() {
        console.log('test_Bet_revertLastIncrease_2')

        const redBet = new RedBet(5, 100)

        redBet.increase(5, BALANCE)
        redBet.increase(25, BALANCE)
        redBet.double(BALANCE)

        let revertedSum = redBet.revertLastIncrease()
        assert(revertedSum === 30)
        assert(redBet.sum === 30)

        revertedSum = redBet.revertLastIncrease()
        assert(revertedSum === 25)
        assert(redBet.sum === 5)

        revertedSum = redBet.revertLastIncrease()
        assert(revertedSum === 5)
        assert(redBet.sum === 0)
    }

    //
    // Сбросить ставку после того, как она сыграла - после запроса выигрыша getPayout.
    // 
    // Пояснение:
    // Нулевые ставки остаются нулевыми.
    // Выигравшие ставки уже вернули нам поставленные суммы и выигрыш через getPayout.
    // Проигравшие ставки вычитаются из баланса еще на этапе создания при вызове increase - поставленные деньги сразу вычитаются из баланса.
    // 
    // Поэтому ставка сбрасывается как в случае выигрыша так и в случае проигрыша.
    //
    private test_Bet_getPayout() {
        console.log('test_Bet_getPayout')

        const winNumber_notRed = 2
        const redBet = new RedBet(5, 100)
        redBet.increase(5, BALANCE)                     // Сейчас мы еще можем сделать reverLastIncrease и вернуть деньги.

        redBet.getPayout(winNumber_notRed)
        assertStrictEqual(redBet.sum, 0)

        const revertedSum = redBet.revertLastIncrease() // Теперь ставка не существует, никаких возвратов по ней - тоже.
        assertStrictEqual(revertedSum, 0)
    }

    ///
    /// Тесты ставок
    ///

    /*
     * Тесты внутренних ставок.
     */
    private testInsideBets() {
        this.test_StraightBet()
        this.test_SplitBet()
        this.test_StreetBet()
        this.test_CornerBet()
        this.test_LineBet()
    }

    private test_StraightBet() {
        this.test_StraightBet_constructor()
        this.test_StraightBet_getPayout()
    }

    private test_StraightBet_constructor() {
        console.log('test_StraightBet_constructor');

        let didNotAcceptMoreThanOne = false
        try {
            new StraightBet(MIN_BET, MAX_BET, [1, 2])
        } catch (e) {
            didNotAcceptMoreThanOne = true
        }
        assert(didNotAcceptMoreThanOne)
    }

    private test_StraightBet_getPayout() {
        console.log('test_StraightBet_getPayout');

        const betSum = 10
        const betNumber = 1
        const loseNumber = 0
        const winPayout = betSum * 36
        const zeroPayout = 0

        const straightBet = new StraightBet(MIN_BET, MAX_BET, [betNumber])
        straightBet.increase(betSum, BALANCE)

        let payout = straightBet.getPayout(betNumber)
        assert(payout === winPayout)

        payout = straightBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private test_SplitBet() {
        this.test_SplitBet_constructor()
        this.test_SplitBet_getPayout()
    }

    private test_SplitBet_constructor() {
        console.log('test_SplitBet_constructor');

        let didNotAcceptMoreThanTwo = false
        try {
            new SplitBet(MIN_BET, MAX_BET, [1, 2, 3])
        } catch (e) {
            didNotAcceptMoreThanTwo = true
        }
        assert(didNotAcceptMoreThanTwo)

        let didNotAcceptLessThanTwo = false
        try {
            new SplitBet(MIN_BET, MAX_BET, [1])
        } catch (e) {
            didNotAcceptLessThanTwo = true
        }
        assert(didNotAcceptLessThanTwo)
    }

    private test_SplitBet_getPayout() {
        console.log('test_SplitBet_getPayout');

        const betSum = 10
        const betNumber1 = 1
        const betNumber2 = 2
        const loseNumber = 0
        const winPayout = (betSum * 36) / 2
        const zeroPayout = 0

        const splitBet = new SplitBet(MIN_BET, MAX_BET, [betNumber1, betNumber2])

        splitBet.increase(betSum, BALANCE)
        let payout = splitBet.getPayout(betNumber1)
        assert(payout === winPayout)

        splitBet.increase(betSum, BALANCE) // После каждого getPayout ставка сбрасывается.
        payout = splitBet.getPayout(betNumber2)
        assert(payout === winPayout)

        splitBet.increase(betSum, BALANCE)
        payout = splitBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private test_StreetBet() {
        this.test_StreetBet_constructor()
        this.test_StreetBet_getPayout()
    }

    private test_StreetBet_constructor() {
        console.log('test_StreetBet_constructor');

        let didNotAcceptMoreThanThree = false
        try {
            new StreetBet(MIN_BET, MAX_BET, [1, 2, 3, 4])
        } catch (e) {
            didNotAcceptMoreThanThree = true
        }
        assert(didNotAcceptMoreThanThree)

        let didNotAcceptLessThanThree = false
        try {
            new StreetBet(MIN_BET, MAX_BET, [1, 2])
        } catch (e) {
            didNotAcceptLessThanThree = true
        }
        assert(didNotAcceptLessThanThree)
    }

    private test_StreetBet_getPayout() {
        console.log('test_StreetBet_getPayout');

        const betSum = 10
        const betNumber1 = 1
        const betNumber2 = 2
        const betNumber3 = 3
        const loseNumber = 0
        const winPayout = (betSum * 36) / 3
        const zeroPayout = 0

        const streetBet = new StreetBet(MIN_BET, MAX_BET, [betNumber1, betNumber2, betNumber3])

        streetBet.increase(betSum, BALANCE)
        let payout = streetBet.getPayout(betNumber1)
        assert(payout === winPayout)

        streetBet.increase(betSum, BALANCE)
        payout = streetBet.getPayout(betNumber2)
        assert(payout === winPayout)

        streetBet.increase(betSum, BALANCE)
        payout = streetBet.getPayout(betNumber3)
        assert(payout === winPayout)

        streetBet.increase(betSum, BALANCE)
        payout = streetBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private test_CornerBet() {
        this.test_CornerBet_constructor()
        this.test_CornerBet_getPayout()
    }

    private test_CornerBet_constructor() {
        console.log('test_CornerBet_constructor');

        let didNotAcceptMoreThanFour = false
        try {
            new CornerBet(MIN_BET, MAX_BET, [1, 2, 3, 4, 5])
        } catch (e) {
            didNotAcceptMoreThanFour = true
        }
        assert(didNotAcceptMoreThanFour)

        let didNotAcceptLessThanFour = false
        try {
            new CornerBet(MIN_BET, MAX_BET, [1, 2, 3])
        } catch (e) {
            didNotAcceptLessThanFour = true
        }
        assert(didNotAcceptLessThanFour)
    }

    private test_CornerBet_getPayout() {
        console.log('test_CornerBet_getPayout')

        const betSum = 10
        const betNumber1 = 1
        const betNumber2 = 2
        const betNumber3 = 3
        const betNumber4 = 4
        const loseNumber = 0
        const winPayout = (betSum * 36) / 4
        const zeroPayout = 0

        const cornerBet = new CornerBet(MIN_BET, MAX_BET, [betNumber1, betNumber2, betNumber3, betNumber4])

        cornerBet.increase(betSum, BALANCE)
        let payout = cornerBet.getPayout(betNumber1)
        assert(payout === winPayout)

        cornerBet.increase(betSum, BALANCE)
        payout = cornerBet.getPayout(betNumber2)
        assert(payout === winPayout)

        cornerBet.increase(betSum, BALANCE)
        payout = cornerBet.getPayout(betNumber3)
        assert(payout === winPayout)

        cornerBet.increase(betSum, BALANCE)
        payout = cornerBet.getPayout(betNumber4)
        assert(payout === winPayout)

        cornerBet.increase(betSum, BALANCE)
        payout = cornerBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private test_LineBet() {
        this.test_LineBet_constructor()
        this.test_LineBet_getPayout()
    }

    private test_LineBet_constructor() {
        console.log('test_LineBet_constructor');

        let didNotAcceptMoreThanSix = false
        try {
            new LineBet(MIN_BET, MAX_BET, [1, 2, 3, 4, 5, 6, 7])
        } catch (e) {
            didNotAcceptMoreThanSix = true
        }
        assert(didNotAcceptMoreThanSix)

        let didNotAcceptLessThanSix = false
        try {
            new LineBet(MIN_BET, MAX_BET, [1, 2, 3, 4, 5])
        } catch (e) {
            didNotAcceptLessThanSix = true
        }
        assert(didNotAcceptLessThanSix)
    }

    private test_LineBet_getPayout() {
        console.log('test_LineBet_getPayout');

        const betSum = 10
        const betNumber1 = 1
        const betNumber2 = 2
        const betNumber3 = 3
        const betNumber4 = 4
        const betNumber5 = 5
        const betNumber6 = 6
        const loseNumber = 0
        const winPayout = (betSum * 36) / 6
        const zeroPayout = 0

        const lineBet = new LineBet(MIN_BET, MAX_BET, [betNumber1, betNumber2, betNumber3, betNumber4, betNumber5, betNumber6])

        lineBet.increase(betSum, BALANCE)
        let payout = lineBet.getPayout(betNumber1)
        assert(payout === winPayout)

        lineBet.increase(betSum, BALANCE)
        payout = lineBet.getPayout(betNumber2)
        assert(payout === winPayout)

        lineBet.increase(betSum, BALANCE)
        payout = lineBet.getPayout(betNumber3)
        assert(payout === winPayout)

        lineBet.increase(betSum, BALANCE)
        payout = lineBet.getPayout(betNumber4)
        assert(payout === winPayout)

        lineBet.increase(betSum, BALANCE)
        payout = lineBet.getPayout(betNumber5)
        assert(payout === winPayout)

        lineBet.increase(betSum, BALANCE)
        payout = lineBet.getPayout(betNumber6)
        assert(payout === winPayout)

        lineBet.increase(betSum, BALANCE)
        payout = lineBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    /*
     * Тесты внешних ставок.
     */
    private testOutsideBets() {
        this.testRedBet()
        this.testBlackBet()

        this.testEvenBet()
        this.testOddBet()

        this.testLowBet()
        this.testHighBet()

        this.testColumn1stBet()
        this.testColumn2ndBet()
        this.testColumn3rdBet()

        this.testDozen1stBet()
        this.testDozen2ndBet()
        this.testDozen3rdBet()
    }

    private testRedBet() {
        console.log('testRedBet');

        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 2
        const zeroPayout = 0

        const redBet = new RedBet(MIN_BET, MAX_BET)

        let payout
        for (let redNumber of redNumbers) {
            redBet.increase(betSum, BALANCE)
            payout = redBet.getPayout(redNumber)
            assert(payout === winPayout)
        }

        redBet.increase(betSum, BALANCE)
        payout = redBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testBlackBet() {
        console.log('testBlackBet');

        const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 2
        const zeroPayout = 0

        const blackBet = new BlackBet(MIN_BET, MAX_BET)

        let payout
        for (let blackNumber of blackNumbers) {
            blackBet.increase(betSum, BALANCE)
            payout = blackBet.getPayout(blackNumber)
            assert(payout === winPayout)
        }

        blackBet.increase(betSum, BALANCE)
        payout = blackBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testEvenBet() {
        console.log('testEvenBet');

        const evenNumbers: number[] = []
        for (let i = 1; i <= 36; i++) {
            if (i % 2 === 0) {
                evenNumbers.push(i)
            }
        }

        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 2
        const zeroPayout = 0

        const evenBet = new EvenBet(MIN_BET, MAX_BET)

        let payout
        for (let evenNumber of evenNumbers) {
            evenBet.increase(betSum, BALANCE)
            payout = evenBet.getPayout(evenNumber)
            assert(payout === winPayout)
        }

        evenBet.increase(betSum, BALANCE)
        payout = evenBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testOddBet() {
        console.log('testOddBet');

        const oddNumbers: number[] = []
        for (let i = 1; i <= 36; i++) {
            if (i % 2 !== 0) {
                oddNumbers.push(i)
            }
        }

        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 2
        const zeroPayout = 0

        const oddBet = new OddBet(MIN_BET, MAX_BET)

        let payout
        for (let oddNumber of oddNumbers) {
            oddBet.increase(betSum, BALANCE)
            payout = oddBet.getPayout(oddNumber)
            assert(payout === winPayout)
        }

        oddBet.increase(betSum, BALANCE)
        payout = oddBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testLowBet() {
        console.log('testLowBet');

        const lowNumbers: number[] = []
        for (let i = 1; i <= 18; i++) {
            lowNumbers.push(i)
        }

        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 2
        const zeroPayout = 0

        const lowBet = new LowBet(MIN_BET, MAX_BET)

        let payout
        for (let lowNumber of lowNumbers) {
            lowBet.increase(betSum, BALANCE)
            payout = lowBet.getPayout(lowNumber)
            assert(payout === winPayout)
        }

        lowBet.increase(betSum, BALANCE)
        payout = lowBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testHighBet() {
        console.log('testHighBet');

        const highNumbers: number[] = []
        for (let i = 19; i <= 36; i++) {
            highNumbers.push(i)
        }

        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 2
        const zeroPayout = 0

        const highBet = new HighBet(MIN_BET, MAX_BET)

        let payout
        for (let highNumber of highNumbers) {
            highBet.increase(betSum, BALANCE)
            payout = highBet.getPayout(highNumber)
            assert(payout === winPayout)
        }

        highBet.increase(betSum, BALANCE)
        payout = highBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testColumn1stBet() {
        console.log('testColumn1stBet');

        const column1stNumbers = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        const column1stBet = new Column1stBet(MIN_BET, MAX_BET)

        let payout
        for (let number of column1stNumbers) {
            column1stBet.increase(betSum, BALANCE)
            payout = column1stBet.getPayout(number)
            assert(payout === winPayout)
        }

        column1stBet.increase(betSum, BALANCE)
        payout = column1stBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testColumn2ndBet() {
        console.log('testColumn2ndBet');

        const column2ndNumbers = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        const column2ndBet = new Column2ndBet(MIN_BET, MAX_BET)

        let payout
        for (let number of column2ndNumbers) {
            column2ndBet.increase(betSum, BALANCE)
            payout = column2ndBet.getPayout(number)
            assert(payout === winPayout)
        }

        column2ndBet.increase(betSum, BALANCE)
        payout = column2ndBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testColumn3rdBet() {
        console.log('testColumn3rdBet');

        const column3rdNumbers = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        const column3rdBet = new Column3rdBet(MIN_BET, MAX_BET)

        let payout
        for (let number of column3rdNumbers) {
            column3rdBet.increase(betSum, BALANCE)
            payout = column3rdBet.getPayout(number)
            assert(payout === winPayout)
        }

        column3rdBet.increase(betSum, BALANCE)
        payout = column3rdBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testDozen1stBet() {
        console.log('testDozen1stBet');

        const dozen1stNumbers: number[] = []
        for (let i = 1; i <= 12; i++) {
            dozen1stNumbers.push(i)
        }

        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        const dozen1stBet = new Dozen1stBet(MIN_BET, MAX_BET)

        let payout
        for (let number of dozen1stNumbers) {
            dozen1stBet.increase(betSum, BALANCE)
            payout = dozen1stBet.getPayout(number)
            assert(payout === winPayout)
        }

        dozen1stBet.increase(betSum, BALANCE)
        payout = dozen1stBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testDozen2ndBet() {
        console.log('testDozen2ndBet');

        const dozen2ndNumbers: number[] = []
        for (let i = 13; i <= 24; i++) {
            dozen2ndNumbers.push(i)
        }

        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        const dozen2ndBet = new Dozen2ndBet(MIN_BET, MAX_BET)

        let payout
        for (let number of dozen2ndNumbers) {
            dozen2ndBet.increase(betSum, BALANCE)
            payout = dozen2ndBet.getPayout(number)
            assert(payout === winPayout)
        }

        dozen2ndBet.increase(betSum, BALANCE)
        payout = dozen2ndBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testDozen3rdBet() {
        console.log('testDozen3rdBet')

        const dozen3rdNumbers: number[] = []
        for (let i = 25; i <= 36; i++) {
            dozen3rdNumbers.push(i)
        }

        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        const dozen3rdBet = new Dozen3rdBet(MIN_BET, MAX_BET)

        let payout
        for (let number of dozen3rdNumbers) {
            dozen3rdBet.increase(betSum, BALANCE)
            payout = dozen3rdBet.getPayout(number)
            assert(payout === winPayout)
        }

        dozen3rdBet.increase(betSum, BALANCE)
        payout = dozen3rdBet.getPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    update(deltaTime: number) {
    }
}