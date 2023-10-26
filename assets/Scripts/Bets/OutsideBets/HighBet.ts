import Bet from '../Bet';

export default class HighBet extends Bet {
    constructor(min: number, max: number) {
        super(min, max, [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36])
    }

    protected CalcPayout(): number {
        return this.sum * 2
    }
}