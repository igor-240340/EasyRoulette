import Quest from './Quest';

export default class Quest3 extends Quest {
    constructor(questName: string, inititalBalance: number) {
        super(questName, 1, inititalBalance);
    }

    protected checkConditionAfterLastPlay(): boolean {
        return true;
    }

    protected checkConditionAfterAllPlays(): boolean {
        return this.newBalance >= this.inititalBalance + 100;
    }
}