import Quest from './Quest';

// Сделать любую ставку.
export default class Quest1 extends Quest {
    constructor(questName: string, inititalBalance: number) {
        super(questName, 1, inititalBalance);
    }

    protected checkConditionAfterLastPlay(): boolean {
        return true;
    }

    protected checkConditionAfterAllPlays(): boolean {
        return true;
    }
}