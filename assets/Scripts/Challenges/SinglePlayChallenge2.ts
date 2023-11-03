import { log } from 'cc';
import assert from '../Helper';
import BetType from '../Bets/BetType';

// Не уйди в минус в следующей игре.
export default class SinglePlayChallenge2 {
    private balanceBefore: number = 0;

    constructor(balanceBefore: number) {
        assert(balanceBefore > 0);
        this.balanceBefore = balanceBefore;
    }

    public isPassed(newBalance: number): boolean {
        log('isPassed');
        return newBalance >= this.balanceBefore;
    }
}