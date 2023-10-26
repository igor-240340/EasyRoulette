import Bet from '../Bet';

export default class StraightBet extends Bet {
    protected CalcPayout(): number {
        return this.sum * 36
    }
}