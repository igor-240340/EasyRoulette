import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

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

@ccclass('Tests')
export class Tests extends Component {
    start() {
        this.testInsideBets();
        this.testOutsideBets();
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

        let straightBet = new StraightBet(betNumber, betSum)

        let payout = straightBet.GetPayout(betNumber)
        this.assert(payout === winPayout)

        payout = straightBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
    }

    private testSplitBet() {
        console.log('testSplitBet');

        const betSum = 10
        const betNumber1 = 1
        const betNumber2 = 2
        const loseNumber = 0
        const winPayout = (betSum * 36) / 2
        const zeroPayout = 0

        let splitBet = new SplitBet(betNumber1, betNumber2, betSum)

        let payout = splitBet.GetPayout(betNumber1)
        this.assert(payout === winPayout)

        payout = splitBet.GetPayout(betNumber2)
        this.assert(payout === winPayout)

        payout = splitBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
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

        let streetBet = new StreetBet([betNumber1, betNumber2, betNumber3], betSum)

        let payout = streetBet.GetPayout(betNumber1)
        this.assert(payout === winPayout)

        payout = streetBet.GetPayout(betNumber2)
        this.assert(payout === winPayout)

        payout = streetBet.GetPayout(betNumber3)
        this.assert(payout === winPayout)

        payout = streetBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
    }

    private testCornerBet() {
        console.log('testCornerBet');

        const betSum = 10
        const betNumber1 = 1
        const betNumber2 = 2
        const betNumber3 = 3
        const betNumber4 = 4
        const loseNumber = 0
        const winPayout = (betSum * 36) / 4
        const zeroPayout = 0

        let cornerBet = new CornerBet([betNumber1, betNumber2, betNumber3, betNumber4], betSum)

        let payout = cornerBet.GetPayout(betNumber1)
        this.assert(payout === winPayout)

        payout = cornerBet.GetPayout(betNumber2)
        this.assert(payout === winPayout)

        payout = cornerBet.GetPayout(betNumber3)
        this.assert(payout === winPayout)

        payout = cornerBet.GetPayout(betNumber4)
        this.assert(payout === winPayout)

        payout = cornerBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
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

        let lineBet = new LineBet([betNumber1, betNumber2, betNumber3, betNumber4, betNumber5, betNumber6], betSum)

        let payout = lineBet.GetPayout(betNumber1)
        this.assert(payout === winPayout)

        payout = lineBet.GetPayout(betNumber2)
        this.assert(payout === winPayout)

        payout = lineBet.GetPayout(betNumber3)
        this.assert(payout === winPayout)

        payout = lineBet.GetPayout(betNumber4)
        this.assert(payout === winPayout)

        payout = lineBet.GetPayout(betNumber5)
        this.assert(payout === winPayout)

        payout = lineBet.GetPayout(betNumber6)
        this.assert(payout === winPayout)

        payout = lineBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
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

        let redBet = new RedBet(betSum)

        for (let redNumber of redNumbers) {
            let payout = redBet.GetPayout(redNumber)
            this.assert(payout === winPayout)
        }

        let payout = redBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
    }

    private testBlackBet() {
        console.log('testBlackBet');

        const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 2
        const zeroPayout = 0

        let blackBet = new BlackBet(betSum)

        for (let blackNumber of blackNumbers) {
            let payout = blackBet.GetPayout(blackNumber)
            this.assert(payout === winPayout)
        }

        let payout = blackBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
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

        let evenBet = new EvenBet(betSum)

        for (let evenNumber of evenNumbers) {
            let payout = evenBet.GetPayout(evenNumber)
            this.assert(payout === winPayout)
        }

        let payout = evenBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
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

        let oddBet = new OddBet(betSum)

        for (let oddNumber of oddNumbers) {
            let payout = oddBet.GetPayout(oddNumber)

            this.assert(payout === winPayout)
        }

        let payout = oddBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
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

        let lowBet = new LowBet(betSum)

        for (let lowNumber of lowNumbers) {
            let payout = lowBet.GetPayout(lowNumber)

            this.assert(payout === winPayout)
        }

        let payout = lowBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
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

        let highBet = new HighBet(betSum)

        for (let highNumber of highNumbers) {
            let payout = highBet.GetPayout(highNumber)

            this.assert(payout === winPayout)
        }

        let payout = highBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
    }

    private testColumn1stBet() {
        console.log('testColumn1stBet');

        const column1stNumbers = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        let column1stBet = new Column1stBet(betSum)

        for (let number of column1stNumbers) {
            let payout = column1stBet.GetPayout(number)
            this.assert(payout === winPayout)
        }

        let payout = column1stBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
    }

    private testColumn2ndBet() {
        console.log('testColumn2ndBet');

        const column2ndNumbers = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        let column2ndBet = new Column2ndBet(betSum)

        for (let number of column2ndNumbers) {
            let payout = column2ndBet.GetPayout(number)
            this.assert(payout === winPayout)
        }

        let payout = column2ndBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
    }

    private testColumn3rdBet() {
        console.log('testColumn3rdBet');

        const column3rdNumbers = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
        const betSum = 10
        const loseNumber = 0
        const winPayout = betSum * 3
        const zeroPayout = 0

        let column3rdBet = new Column3rdBet(betSum)

        for (let number of column3rdNumbers) {
            let payout = column3rdBet.GetPayout(number)
            this.assert(payout === winPayout)
        }

        let payout = column3rdBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
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

        let dozen1stBet = new Dozen1stBet(betSum)

        for (let number of dozen1stNumbers) {
            let payout = dozen1stBet.GetPayout(number)
            this.assert(payout === winPayout)
        }

        let payout = dozen1stBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
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

        let dozen2ndBet = new Dozen2ndBet(betSum)

        for (let number of dozen2ndNumbers) {
            let payout = dozen2ndBet.GetPayout(number)
            this.assert(payout === winPayout)
        }

        let payout = dozen2ndBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
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

        let dozen3rdBet = new Dozen3rdBet(betSum)

        for (let number of dozen3rdNumbers) {
            let payout = dozen3rdBet.GetPayout(number)
            this.assert(payout === winPayout)
        }

        let payout = dozen3rdBet.GetPayout(loseNumber)
        this.assert(payout === zeroPayout)
    }

    update(deltaTime: number) {
    }

    private assert(condition: boolean) {
        if (!condition) {
            throw new Error('Assertion Failed');
        }
    }
}
