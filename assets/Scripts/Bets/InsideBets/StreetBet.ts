import Bet from '../Bet';

export default class StreetBet extends Bet {
    protected CalcPayout(): number {
        return (this.sum * 36) / 3
    }
}