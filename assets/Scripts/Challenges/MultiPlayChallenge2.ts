import { log } from 'cc';
import assert from '../Helper';
import BetType from '../Bets/BetType';

// Не уйди в минус за N игр.
export default class MultiPlayChallenge2 {
    public inititalBalance: number = 0;

    private numberOfPlays: number = 0;

    constructor(numberOfPlays: number, initialBalance: number) {
        assert(numberOfPlays > 1);
        assert(initialBalance > 0);

        this.numberOfPlays = numberOfPlays;
        this.inititalBalance = initialBalance;
    }

    public playsLeft(): number {
        return --this.numberOfPlays;
    }

    public isPassed(newBalance: number): boolean {
        log('isPassed');
        return newBalance >= this.inititalBalance;
    }
}