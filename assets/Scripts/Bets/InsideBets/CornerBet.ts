import Bet from '../Bet';

export default class CornerBet extends Bet {
    protected CalcPayout(): number {
        return (this.sum * 36) / 4
    }
}