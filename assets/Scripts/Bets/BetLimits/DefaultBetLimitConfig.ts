import BetType from "../BetType";
import BetLimitConfig from "./BetLimitConfig";

export default class DefaultBetLimitConfig extends BetLimitConfig {
    constructor() {
        super();

        this.betTypeToMinMax.set(BetType.Red, [800, 8000]);
        this.betTypeToMinMax.set(BetType.Black, [800, 8000]);

        this.betTypeToMinMax.set(BetType.Odd, [800, 8000]);
        this.betTypeToMinMax.set(BetType.Even, [800, 8000]);

        this.betTypeToMinMax.set(BetType.Low, [800, 8000]);
        this.betTypeToMinMax.set(BetType.High, [800, 8000]);

        this.betTypeToMinMax.set(BetType.Column1st, [800, 4800]);
        this.betTypeToMinMax.set(BetType.Column2nd, [800, 4800]);
        this.betTypeToMinMax.set(BetType.Column3rd, [800, 4800]);

        this.betTypeToMinMax.set(BetType.Dozen1st, [800, 4800]);
        this.betTypeToMinMax.set(BetType.Dozen2nd, [800, 4800]);
        this.betTypeToMinMax.set(BetType.Dozen3rd, [800, 4800]);

        this.betTypeToMinMax.set(BetType.Straight, [100, 400]);
        this.betTypeToMinMax.set(BetType.Split, [100, 800]);
        this.betTypeToMinMax.set(BetType.Street, [100, 1200]);
        this.betTypeToMinMax.set(BetType.Corner, [100, 1600]);
        this.betTypeToMinMax.set(BetType.Line, [100, 2400]);
    }
}