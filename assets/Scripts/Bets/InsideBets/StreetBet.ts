import Bet from '../Bet';

import assert from '../../Helper';

export default class StreetBet extends Bet {
    constructor(min: number, max: number, numbers: number[]) {
        assert(numbers.length === 3)

        super(min, max, numbers)
    }

    protected CalcPayout(): number {
        return (this.sum * 36) / 3
    }
}