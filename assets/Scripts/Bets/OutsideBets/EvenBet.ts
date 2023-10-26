import Bet from '../Bet';

export default class EvenBet extends Bet {
    constructor(min: number, max: number) {
        super(min, max, [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36])
    }

    protected CalcPayout(): number {
        return this.sum * 2
    }
}