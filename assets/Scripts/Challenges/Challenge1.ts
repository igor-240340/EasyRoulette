import { log } from 'cc';
import assert from '../Helper';
import BetType from '../Bets/BetType';

export default class Challenge1 {
    public allowedBetTypes: BetType[] = [BetType.Dozen1st, BetType.Dozen2nd, BetType.Dozen3rd];

    private expectedMinWinPayout: number = 0;

    constructor(expectedMinWinPayout: number) {
        assert(expectedMinWinPayout > 0);

        this.expectedMinWinPayout = expectedMinWinPayout;
    }

    public isPassed(winPayout: number): boolean {
        log('isPassed');
        return winPayout >= this.expectedMinWinPayout;
    }
}