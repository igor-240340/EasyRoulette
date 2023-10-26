import Bet from '../Bet';

export default class Dozen2ndBet extends Bet {
    constructor(min: number, max: number) {
        super(min, max, [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
    }

    protected CalcPayout(): number {
        return this.sum * 3
    }
}