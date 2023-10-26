import Bet from '../Bet';

export default class BlackBet extends Bet {
    constructor(min: number, max: number) {
        super(min, max, [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35])
    }

    protected CalcPayout(): number {
        return this.sum * 2
    }
}