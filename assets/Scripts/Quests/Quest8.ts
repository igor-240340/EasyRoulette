import Quest from './Quest';

// Увеличь баланс не меньше чем на M за N игр.
export default class Quest8 extends Quest {
    constructor(questName: string, inititalBalance: number) {
        super(questName, 3, inititalBalance);
    }

    protected checkConditionAfterLastPlay(): boolean {
        return true;
    }

    protected checkConditionAfterAllPlays(): boolean {
        return this.newBalance >= this.inititalBalance + 100;
    }
}