import BetType from "../BetType";
import BetLimitConfig from "./BetLimitConfig";

/**
 * Тестовые лимиты для ставок.
 * Используются в тестах, которые были написаны до создания класса конфигурации лимитов.
 */
export default class TestBetLimitConfig extends BetLimitConfig {
    constructor() {
        super();

        this.betTypeToMinMax.set(BetType.Red, [5, 100]);
        this.betTypeToMinMax.set(BetType.Black, [5, 100]);

        this.betTypeToMinMax.set(BetType.Odd, [5, 100]);
        this.betTypeToMinMax.set(BetType.Even, [5, 100]);

        this.betTypeToMinMax.set(BetType.Low, [5, 100]);
        this.betTypeToMinMax.set(BetType.High, [5, 100]);

        this.betTypeToMinMax.set(BetType.Column1st, [5, 100]);
        this.betTypeToMinMax.set(BetType.Column2nd, [5, 100]);
        this.betTypeToMinMax.set(BetType.Column3rd, [5, 100]);

        this.betTypeToMinMax.set(BetType.Dozen1st, [5, 100]);
        this.betTypeToMinMax.set(BetType.Dozen2nd, [5, 100]);
        this.betTypeToMinMax.set(BetType.Dozen3rd, [5, 100]);

        this.betTypeToMinMax.set(BetType.Straight, [5, 100]);
        this.betTypeToMinMax.set(BetType.Split, [5, 100]);
        this.betTypeToMinMax.set(BetType.Street, [5, 100]);
        this.betTypeToMinMax.set(BetType.Corner, [5, 100]);
        this.betTypeToMinMax.set(BetType.Line, [5, 100]);
    }
}