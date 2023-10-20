import Bet from '../Bet';

export default class StraightBet extends Bet {
    constructor(betNumber: number, sum: number) {
        super([betNumber], sum)
    }

    protected CalcPayout(): number {
        return this.sum * 36
    }
}