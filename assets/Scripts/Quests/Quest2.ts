import Quest from './Quest';

// Выиграй 100.
export default class Quest2 extends Quest {
    constructor(questName: string, inititalBalance: number) {
        super(questName, 1, inititalBalance);
    }

    protected checkConditionAfterLastPlay(): boolean {
        return true;
    }

    protected checkConditionAfterAllPlays(): boolean {
        return this.totalPayout >= 100;
    }
}