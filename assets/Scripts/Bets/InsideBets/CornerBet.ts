import Bet from '../Bet';

export default class CornerBet extends Bet {
    constructor(betNumbers: number[], sum: number) {
        super(betNumbers, sum)
    }

    protected CalcPayout(): number {
        return (this.sum * 36) / 4
    }
}