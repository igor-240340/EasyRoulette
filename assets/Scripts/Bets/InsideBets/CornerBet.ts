import Bet from '../Bet';

import assert from '../../Helper';

export default class CornerBet extends Bet {
    constructor(min: number, max: number, numbers: number[]) {
        assert(numbers.length === 4)

        super(min, max, numbers)
    }

    protected CalcPayout(): number {
        return (this.sum * 36) / 4
    }
}