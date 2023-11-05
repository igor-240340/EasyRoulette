import { log } from 'cc';
import assert from '../Helper';
import BetType from '../Bets/BetType';

// Количество игр: N.
// Условие на выходе челленджа: баланс на выходе = баланс на входе + M.
// Условие на выходе челленджа: сумма всех ставок должна быть не меньше B.
// Условие на выходе каждой игры: нет.
// Ограничение на ставки: нет.
export default class MultiPlayChallenge6 {
    public inititalBalance: number = 0;
    public expectedIncrease: number = 0;
    public actualTotalBetSum: number = 0;

    private numberOfPlays: number = 0;
    private expectedTotalBetSum: number = 0;

    constructor(numberOfPlays: number, initialBalance: number, expectedIncrease: number, expectedTotalBetSum: number) {
        assert(numberOfPlays > 1);
        assert(initialBalance > 0);
        assert(expectedIncrease > 0);
        assert(expectedTotalBetSum > 0);

        this.numberOfPlays = numberOfPlays;
        this.inititalBalance = initialBalance;
        this.expectedIncrease = expectedIncrease;
        this.expectedTotalBetSum = expectedTotalBetSum;
    }

    public playsLeft(betSum: number): number {
        assert(betSum > 0);
        this.actualTotalBetSum += betSum;

        return --this.numberOfPlays;
    }

    public isPassed(newBalance: number): boolean {
        log('isPassed');
        return (newBalance >= this.inititalBalance + this.expectedIncrease) && (this.actualTotalBetSum >= this.expectedTotalBetSum);
    }
}