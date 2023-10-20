import Bet from '../Bet';

export default class SplitBet extends Bet {
    constructor(number1: number, number2: number, sum: number) {
        super([number1, number2], sum)
    }

    protected CalcPayout(): number {
        return (this.sum * 36) / 2
    }
}