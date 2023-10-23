import Bet from '../Bet';

export default class CornerBet extends Bet {
    constructor(number1: number, number2: number, number3: number, number4: number, sum: number) {
        super([number1, number2, number3, number4], sum)
    }

    protected CalcPayout(): number {
        return (this.sum * 36) / 4
    }
}