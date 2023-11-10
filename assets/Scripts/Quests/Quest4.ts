import Quest from './Quest';

export default class Quest4 extends Quest {
    constructor(questName: string, inititalBalance: number) {
        super(questName, 3, inititalBalance);
    }

    protected checkConditionAfterLastPlay(): boolean {
        return true;
    }

    protected checkConditionAfterAllPlays(): boolean {
        return true;
    }
}