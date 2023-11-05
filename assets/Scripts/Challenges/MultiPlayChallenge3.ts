import { log } from 'cc';
import assert from '../Helper';
import BetType from '../Bets/BetType';

// Увеличь баланс не меньше чем на M за N игр.
export default class MultiPlayChallenge3 {
    public inititalBalance: number = 0;
    public expectedIncrease: number = 0;

    private numberOfPlays: number = 0;

    constructor(numberOfPlays: number, initialBalance: number, expectedIncrease: number) {
        assert(numberOfPlays > 1);
        assert(initialBalance > 0);
        assert(expectedIncrease > 0);

        this.numberOfPlays = numberOfPlays;
        this.inititalBalance = initialBalance;
        this.expectedIncrease = expectedIncrease;
    }

    public playsLeft(): number {
        return --this.numberOfPlays;
    }

    public isPassed(newBalance: number): boolean {
        log('isPassed');
        return newBalance >= this.inititalBalance + this.expectedIncrease;
    }
}