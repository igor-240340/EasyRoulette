import Bet from '../Bet';

export default class Dozen1stBet extends Bet {
    constructor(min: number, max: number) {
        super(min, max, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    }

    protected CalcPayout(): number {
        return this.sum * 3
    }
}