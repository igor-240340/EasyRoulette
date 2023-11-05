import { log } from 'cc';
import assert from '../Helper';
import BetType from '../Bets/BetType';

// Выиграй не меньше M за N игр.
export default class MultiPlayChallenge1 {
    public expectedTotalWinPayout: number = 0;
    public actualTotalWinPayout: number = 0;

    private numberOfPlays: number = 0;

    constructor(numberOfPlays: number, expectedTotalWinPayout: number) {
        assert(numberOfPlays > 1);
        assert(expectedTotalWinPayout > 0);

        this.numberOfPlays = numberOfPlays;
        this.expectedTotalWinPayout = expectedTotalWinPayout;
    }

    public increaseTotalWinPayout(singleWinPayout: number): number {
        assert(this.numberOfPlays > 0);

        this.actualTotalWinPayout += singleWinPayout;

        return --this.numberOfPlays;
    }

    public isPassed(): boolean {
        log('isPassed');
        return this.actualTotalWinPayout >= this.expectedTotalWinPayout;
    }
}