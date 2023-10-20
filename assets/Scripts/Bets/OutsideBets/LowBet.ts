import Bet from '../Bet';

export default class LowBet extends Bet {
    constructor(sum: number) {
        super([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], sum)
    }

    protected CalcPayout(): number {
        return this.sum * 2
    }
}