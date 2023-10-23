import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import assert from './Helper'

import Bet from './Bets/Bet';

// Внутренние ставки.
import StraightBet from './Bets/InsideBets/StraightBet';
import SplitBet from './Bets/InsideBets/SplitBet';
import StreetBet from './Bets/InsideBets/StreetBet';
import CornerBet from './Bets/InsideBets/CornerBet';
import LineBet from './Bets/InsideBets/LineBet';

// Внешние ставки.
import RedBet from './Bets/OutsideBets/RedBet';
import BlackBet from './Bets/OutsideBets/BlackBet';
import EvenBet from './Bets/OutsideBets/EvenBet';
import OddBet from './Bets/OutsideBets/OddBet';
import LowBet from './Bets/OutsideBets/LowBet';
import HighBet from './Bets/OutsideBets/HighBet';
import Column1stBet from './Bets/OutsideBets/Column1stBet';
import Column2ndBet from './Bets/OutsideBets/Column2ndBet';
import Column3rdBet from './Bets/OutsideBets/Column3rdBet';
import Dozen1stBet from './Bets/OutsideBets/Dozen1stBet';
import Dozen2ndBet from './Bets/OutsideBets/Dozen2ndBet';
import Dozen3rdBet from './Bets/OutsideBets/Dozen3rdBet';
import BetManager from './Bets/BetManager';

@ccclass('Tests')
export class Tests extends Component {
    start() {
        this.testInsideBets();
        this.testOutsideBets();

        this.testInvalidBetSum();
        this.testInvalidBetNumber();

        // this.testBetManager()
    }

    ///
    /// Тесты ставок
    ///

    private testInvalidBetSum() {
        console.log('testInvalidBetSum');

        const invalidBetSum1 = 0
        const invalidBetSum2 = -1

        let didNotAcceptInvalidSum = false
        try {
            new RedBet(invalidBetSum1)
        }
        catch (e) {
            didNotAcceptInvalidSum = true
        }
        assert(didNotAcceptInvalidSum)

        didNotAcceptInvalidSum = false
        try {
            new RedBet(invalidBetSum2)
        }
        catch (e) {
            didNotAcceptInvalidSum = true
        }
        assert(didNotAcceptInvalidSum)
    }

    private testInvalidBetNumber() {
        console.log('testInvalidBetNumber');

        const invalidNumber1 = Bet.MIN_NUMBER - 1
        const invalidNumber2 = Bet.MAX_NUMBER + 1

        let didNotAcceptInvalidNumber = false
        try {
            new StraightBet(invalidNumber1, 10)
        }
        catch (e) {
            didNotAcceptInvalidNumber = true
        }
        assert(didNotAcceptInvalidNumber)

        didNotAcceptInvalidNumber = false
        try {
            new StraightBet(invalidNumber2, 10)
        }
        catch (e) {
            didNotAcceptInvalidNumber = true
        }
        assert(didNotAcceptInvalidNumber)
    }

    /*
     * Тесты внутренних ставок.
     */
    private testInsideBets() {
        this.testStraightBet()
        this.testSplitBet()
        this.testStreetBet()
        this.testCornerBet()
        this.testLineBet()
    }

    private testStraightBet() {
        console.log('testStraightBet');

        const betSum = 10
        const betNumber = 1
        const loseNumber = 0
        const winPayout = betSum * 36
        const zeroPayout = 0

        const straightBet = new StraightBet(betNumber, betSum)

        let payout = straightBet.GetPayout(betNumber)
        assert(payout === winPayout)

        payout = straightBet.GetPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testSplitBet() {
        console.log('testSplitBet');

        const betSum = 10
        const betNumber1 = 1
        const betNumber2 = 2
        const loseNumber = 0
        const winPayout = (betSum * 36) / 2
        const zeroPayout = 0

        const splitBet = new SplitBet(betNumber1, betNumber2, betSum)

        let payout = splitBet.GetPayout(betNumber1)
        assert(payout === winPayout)

        payout = splitBet.GetPayout(betNumber2)
        assert(payout === winPayout)

        payout = splitBet.GetPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testStreetBet() {
        console.log('testStreetBet');

        const betSum = 10
        const betNumber1 = 1
        const betNumber2 = 2
        const betNumber3 = 3
        const loseNumber = 0
        const winPayout = (betSum * 36) / 3
        const zeroPayout = 0

        const streetBet = new StreetBet(betNumber1, betNumber2, betNumber3, betSum)

        let payout = streetBet.GetPayout(betNumber1)
        assert(payout === winPayout)

        payout = streetBet.GetPayout(betNumber2)
        assert(payout === winPayout)

        payout = streetBet.GetPayout(betNumber3)
        assert(payout === winPayout)

        payout = streetBet.GetPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testCornerBet() {
        console.log('testCornerBet')

        const betSum = 10
        const betNumber1 = 1
        const betNumber2 = 2
        const betNumber3 = 3
        const betNumber4 = 4
        const loseNumber = 0
        const winPayout = (betSum * 36) / 4
        const zeroPayout = 0

        const cornerBet = new CornerBet(betNumber1, betNumber2, betNumber3, betNumber4, betSum)

        let payout = cornerBet.GetPayout(betNumber1)
        assert(payout === winPayout)

        payout = cornerBet.GetPayout(betNumber2)
        assert(payout === winPayout)

        payout = cornerBet.GetPayout(betNumber3)
        assert(payout === winPayout)

        payout = cornerBet.GetPayout(betNumber4)
        assert(payout === winPayout)

        payout = cornerBet.GetPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testLineBet() {
        console.log('testLineBet');

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

        const lineBet = new LineBet(betNumber1, betNumber2, betNumber3, betNumber4, betNumber5, betNumber6, betSum)

        let payout = lineBet.GetPayout(betNumber1)
        assert(payout === winPayout)

        payout = lineBet.GetPayout(betNumber2)
        assert(payout === winPayout)

        payout = lineBet.GetPayout(betNumber3)
        assert(payout === winPayout)

        payout = lineBet.GetPayout(betNumber4)
        assert(payout === winPayout)

        payout = lineBet.GetPayout(betNumber5)
        assert(payout === winPayout)

        payout = lineBet.GetPayout(betNumber6)
        assert(payout === winPayout)

        payout = lineBet.GetPayout(loseNumber)
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

        const redBet = new RedBet(betSum)

        let payout
        for (let redNumber of redNumbers) {
            payout = redBet.GetPayout(redNumber)
            assert(payout === winPayout)
        }

        payout = redBet.GetPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testBlackBet() {
        console.log('testBlackBet');

        const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 2
        const zeroPayout = 0

        const blackBet = new BlackBet(betSum)

        let payout
        for (let blackNumber of blackNumbers) {
            payout = blackBet.GetPayout(blackNumber)
            assert(payout === winPayout)
        }

        payout = blackBet.GetPayout(loseNumber)
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

        const evenBet = new EvenBet(betSum)

        let payout
        for (let evenNumber of evenNumbers) {
            payout = evenBet.GetPayout(evenNumber)
            assert(payout === winPayout)
        }

        payout = evenBet.GetPayout(loseNumber)
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

        const oddBet = new OddBet(betSum)

        let payout
        for (let oddNumber of oddNumbers) {
            payout = oddBet.GetPayout(oddNumber)
            assert(payout === winPayout)
        }

        payout = oddBet.GetPayout(loseNumber)
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

        const lowBet = new LowBet(betSum)

        let payout
        for (let lowNumber of lowNumbers) {
            payout = lowBet.GetPayout(lowNumber)
            assert(payout === winPayout)
        }

        payout = lowBet.GetPayout(loseNumber)
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

        const highBet = new HighBet(betSum)

        let payout
        for (let highNumber of highNumbers) {
            payout = highBet.GetPayout(highNumber)
            assert(payout === winPayout)
        }

        payout = highBet.GetPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testColumn1stBet() {
        console.log('testColumn1stBet');

        const column1stNumbers = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        const column1stBet = new Column1stBet(betSum)

        let payout
        for (let number of column1stNumbers) {
            payout = column1stBet.GetPayout(number)
            assert(payout === winPayout)
        }

        payout = column1stBet.GetPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testColumn2ndBet() {
        console.log('testColumn2ndBet');

        const column2ndNumbers = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        const column2ndBet = new Column2ndBet(betSum)

        let payout
        for (let number of column2ndNumbers) {
            payout = column2ndBet.GetPayout(number)
            assert(payout === winPayout)
        }

        payout = column2ndBet.GetPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    private testColumn3rdBet() {
        console.log('testColumn3rdBet');

        const column3rdNumbers = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        const column3rdBet = new Column3rdBet(betSum)

        let payout
        for (let number of column3rdNumbers) {
            payout = column3rdBet.GetPayout(number)
            assert(payout === winPayout)
        }

        payout = column3rdBet.GetPayout(loseNumber)
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

        const dozen1stBet = new Dozen1stBet(betSum)

        let payout
        for (let number of dozen1stNumbers) {
            payout = dozen1stBet.GetPayout(number)
            assert(payout === winPayout)
        }

        payout = dozen1stBet.GetPayout(loseNumber)
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

        const dozen2ndBet = new Dozen2ndBet(betSum)

        let payout
        for (let number of dozen2ndNumbers) {
            payout = dozen2ndBet.GetPayout(number)
            assert(payout === winPayout)
        }

        payout = dozen2ndBet.GetPayout(loseNumber)
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

        const dozen3rdBet = new Dozen3rdBet(betSum)

        let payout
        for (let number of dozen3rdNumbers) {
            payout = dozen3rdBet.GetPayout(number)
            assert(payout === winPayout)
        }

        payout = dozen3rdBet.GetPayout(loseNumber)
        assert(payout === zeroPayout)
    }

    /*
     * Тесты менеджера ставок.
     */
    private testBetManager() {
        this.testBetManager_NoBets()
        this.testBetManager_OneBet()
    }

    private testBetManager_NoBets() {
        console.log('testBetManager_NoBets');

        const betManager = new BetManager()

        const totalPayout = betManager.getTotalPayout(1)
        assert(totalPayout === 0)
    }

    private testBetManager_OneBet() {
        console.log('testBetManager_OneBet');

        const betSum = 10
        const winNumber = 1
        const loseNumber = 0
        const winPayout = betSum * 2
        const zeroPayout = 0

        const betManager = new BetManager()
        betManager.makeBet(new RedBet(betSum))

        // Win
        let totalPayout = betManager.getTotalPayout(winNumber)
        assert(totalPayout === winPayout)

        // Lose
        totalPayout = betManager.getTotalPayout(loseNumber)
        assert(totalPayout === zeroPayout)
    }

    update(deltaTime: number) {
    }
}
