import Bet from '../Bet';

export default class Dozen1stBet extends Bet {
    constructor(sum: number) {
        super([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], sum)
    }

    protected CalcPayout(): number {
        return this.sum * 3
    }
}