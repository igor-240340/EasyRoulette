import Quest from './Quest';

// Увеличить баланс не меньше чем на M за N игр.
// Для каждой игры в серии: баланс не должен уменьшаться больше, чем на заданный лимит.
export default class Quest9 extends Quest {
    constructor(questName: string, inititalBalance: number) {
        super(questName, 3, inititalBalance);
    }

    protected checkConditionAfterLastPlay(): boolean {
        return true;
    }

    protected checkConditionAfterAllPlays(): boolean {
        return this.newBalance >= this.inititalBalance + 200;
    }
}