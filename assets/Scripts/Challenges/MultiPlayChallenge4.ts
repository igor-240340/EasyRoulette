import { log } from 'cc';
import assert from '../Helper';
import BetType from '../Bets/BetType';

// Увеличить баланс не меньше чем на M за N игр.
// Для каждой игры в серии должно быть справедливо: суммарный выигрыш не меньше суммарной ставки.
// Последнее условие эквивалентно требованию, чтобы баланс в каждой игре серии не опускался ниже стартового.
export default class MultiPlayChallenge4 {
    public inititalBalance: number = 0;
    public expectedIncrease: number = 0;

    private numberOfPlays: number = 0;
    private challengeIsLost: boolean = false;

    constructor(numberOfPlays: number, initialBalance: number, expectedIncrease: number) {
        assert(numberOfPlays > 1);
        assert(initialBalance > 0);
        assert(expectedIncrease > 0);

        this.numberOfPlays = numberOfPlays;
        this.inititalBalance = initialBalance;
        this.expectedIncrease = expectedIncrease;
    }

    public playsLeft(totalBet: number, winPayout: number): number {
        this.challengeIsLost = winPayout < totalBet;
        return this.challengeIsLost ? 0 : --this.numberOfPlays;
    }

    public isPassed(newBalance: number): boolean {
        log('isPassed');
        return (newBalance >= this.inititalBalance + this.expectedIncrease) && !this.challengeIsLost;
    }
}