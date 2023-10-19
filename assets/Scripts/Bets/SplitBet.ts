import Bet from './Bet';

export default class SplitBet extends Bet {
    constructor(a: number, b: number, sum: number) {
        super([a, b], sum)
    }

    protected CalcPayout(): number {
        return (this.sum * 36) / 2
    }
}