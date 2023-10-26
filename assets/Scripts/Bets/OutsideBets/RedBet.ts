import Bet from '../Bet';

export default class RedBet extends Bet {
    constructor(min: number, max: number) {
        super(min, max, [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])
    }

    protected CalcPayout(): number {
        return this.sum * 2
    }
}