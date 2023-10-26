import Bet from '../Bet';

export default class LineBet extends Bet {
    protected CalcPayout(): number {
        return (this.sum * 36) / 6
    }
}