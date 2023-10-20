import Bet from '../Bet';

export default class Column3rdBet extends Bet {
    constructor(sum: number) {
        super([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36], sum)
    }

    protected CalcPayout(): number {
        return this.sum * 3
    }
}