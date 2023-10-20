import Bet from '../Bet';

export default class Column1stBet extends Bet {
    constructor(sum: number) {
        super([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34], sum)
    }

    protected CalcPayout(): number {
        return this.sum * 3
    }
}