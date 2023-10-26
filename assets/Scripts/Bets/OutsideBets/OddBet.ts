import Bet from '../Bet';

export default class OddBet extends Bet {
    constructor(min: number, max: number) {
        super(min, max, [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35])
    }

    protected CalcPayout(): number {
        return this.sum * 2
    }
}