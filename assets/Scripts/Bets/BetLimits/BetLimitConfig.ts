import { assert } from "cc";

import BetType from "../BetType";

export default abstract class BetLimitConfig {
    protected betTypeToMinMax: Map<BetType, [number, number]> = new Map();

    public getMinMaxBetTupleFor(betType: BetType): [number, number] {
        const minMaxBetTuple = this.betTypeToMinMax.get(betType);
        assert(minMaxBetTuple);
        return minMaxBetTuple;
    }
}