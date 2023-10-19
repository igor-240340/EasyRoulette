import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import SplitBet from './Bets/SplitBet';

@ccclass('Tests')
export class Tests extends Component {
    start() {
        this.runBetTests();
    }

    /*
     * Тесты ставок.
     */
    private runBetTests() {
        this.testSplitBet()
    }

    private testSplitBet() {
        const betSum = 10
        const winNumber1 = 1
        const winNumber2 = 2
        const loseNumber = 0
        const expectedWinPayout = (betSum * 36) / 2
        const expectedLosePayout = 0

        let splitBet = new SplitBet(winNumber1, winNumber2, betSum)

        let actualPayout = splitBet.GetPayout(winNumber1)
        console.log(actualPayout === expectedWinPayout)

        actualPayout = splitBet.GetPayout(winNumber2)
        console.log(actualPayout === expectedWinPayout)

        actualPayout = splitBet.GetPayout(loseNumber)
        console.log(actualPayout === expectedLosePayout)
    }

    update(deltaTime: number) {
    }
}
