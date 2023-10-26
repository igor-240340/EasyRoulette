import Bet from '../Bet';

export default class Column2ndBet extends Bet {
    constructor(min: number, max: number) {
        super(min, max, [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35])
    }

    protected CalcPayout(): number {
        return this.sum * 3
    }
}