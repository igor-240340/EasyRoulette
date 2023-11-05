import { log } from 'cc';
import assert from '../Helper';
import BetType from '../Bets/BetType';

// Количество игр: N.
// Условие на выходе челленджа: баланс на выходе = баланс на входе + M.
// Условие на выходе каждой игры: -
// Ограничение на ставки: для каждой игры уникальный набор ставок.
export default class MultiPlayChallenge5 {
    public allowedBetTypesStack: BetType[][] = [
        [BetType.Straight],
        [BetType.Split],
        [BetType.Street],
        [BetType.Corner],
        [BetType.Line],
        [BetType.Column1st, BetType.Column2nd, BetType.Column3rd],
        [BetType.Dozen1st, BetType.Dozen2nd, BetType.Dozen3rd],
        [BetType.Low, BetType.High],
        [BetType.Odd, BetType.Even],
        [BetType.Red, BetType.Black]
    ];

    public inititalBalance: number = 0;
    public expectedIncrease: number = 0;

    // В этом челлендже определяется доступными ставками.
    private numberOfPlays: number = this.allowedBetTypesStack.length;

    constructor(initialBalance: number, expectedIncrease: number) {
        assert(initialBalance > 0);
        assert(expectedIncrease > 0);

        this.inititalBalance = initialBalance;
        this.expectedIncrease = expectedIncrease;
    }

    public playsLeft(): number {
        return --this.numberOfPlays;
    }

    public isPassed(newBalance: number): boolean {
        log('isPassed');
        return (newBalance >= this.inititalBalance + this.expectedIncrease);
    }
}