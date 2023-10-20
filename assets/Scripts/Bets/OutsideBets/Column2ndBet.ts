import Bet from '../Bet';

export default class Column2ndBet extends Bet {
    constructor(sum: number) {
        super([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35], sum)
    }

    protected CalcPayout(): number {
        return this.sum * 3
    }
}