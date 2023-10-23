import Bet from '../Bet';

export default class LineBet extends Bet {
    constructor(number1: number, number2: number, number3: number, number4: number, number5: number, number6: number, sum: number) {
        super([number1, number2, number3, number4, number5, number6], sum)
    }

    protected CalcPayout(): number {
        return (this.sum * 36) / 6
    }
}