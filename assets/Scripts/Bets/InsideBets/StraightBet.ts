import Bet from '../Bet';

export default class StraightBet extends Bet {
    constructor(number: number, sum: number) {
        super([number], sum)
    }

    protected CalcPayout(): number {
        return this.sum * 36
    }
}