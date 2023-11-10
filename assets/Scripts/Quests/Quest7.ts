import Quest from './Quest';

// Не уйди в минус
export default class Quest7 extends Quest {
    constructor(questName: string, inititalBalance: number) {
        super(questName, 1, inititalBalance);
    }

    protected checkConditionAfterLastPlay(): boolean {
        return true;
    }

    protected checkConditionAfterAllPlays(): boolean {
        return this.newBalance >= this.inititalBalance;
    }
}