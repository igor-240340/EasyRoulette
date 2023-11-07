import { log } from 'cc';
import assert from '../Helper';
import BetType from '../Bets/BetType';

// Количество игр: N.
// Условие на выходе челленджа: баланс на выходе >= баланс на входе.
// Условие на выходе челленджа: не меньше половины игр должны выиграть.
// Условие на выходе каждой игры: нет.
// Ограничение на ставки: нет.
export default class MultiPlayChallenge7 {
    public inititalBalance: number = 0;
    public actualNumberOfWinPlays: number = 0;

    private numberOfPlays: number = 0;
    private expectedNumberOfWinPlays: number = 0;

    constructor(numberOfPlays: number, initialBalance: number, expectedNumberOfWinPlays: number) {
        assert(numberOfPlays > 1);
        assert(initialBalance > 0);
        assert(expectedNumberOfWinPlays > 0);

        this.numberOfPlays = numberOfPlays;
        this.inititalBalance = initialBalance;
        this.expectedNumberOfWinPlays = expectedNumberOfWinPlays;
    }

    public playsLeft(winPayout: number): number {
        if (winPayout > 0)
            this.actualNumberOfWinPlays++;

        return --this.numberOfPlays;
    }

    public isPassed(newBalance: number): boolean {
        log('isPassed');
        return (newBalance >= this.inititalBalance) && (this.actualNumberOfWinPlays >= this.expectedNumberOfWinPlays);
    }
}