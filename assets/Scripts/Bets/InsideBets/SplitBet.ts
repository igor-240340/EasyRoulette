import Bet from '../Bet';

export default class SplitBet extends Bet {
    protected CalcPayout(): number {
        return (this.sum * 36) / 2
    }
}