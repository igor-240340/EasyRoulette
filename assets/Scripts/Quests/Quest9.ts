import Quest from './Quest';

// Для всех игр: суммарный выигрыш не меньше 200.
// Для каждой игры: баланс не должен уменьшаться больше, чем на заданный лимит.
export default class Quest9 extends Quest {
    constructor(questName: string, inititalBalance: number) {
        super(questName, 3, inititalBalance);
    }

    protected checkConditionAfterLastPlay(): boolean {
        return (this.totalBetBeforePlay - this.totalPayoutAfterPlay) <= 50;
    }

    protected checkConditionAfterAllPlays(): boolean {
        return this.totalPayout >= 200;
    }
}