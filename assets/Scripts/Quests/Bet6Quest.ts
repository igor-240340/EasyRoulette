import Quest from './Quest';
import QuestPlayContext from './QuestPlayContext';

export default class Bet6Quest extends Quest {
    private totalPayout: number = 0;

    constructor() {
        super(3, 'Выиграй 300');
    }

    protected payoutConditionMetForOnePlay(playContext: QuestPlayContext) {
        this.totalPayout += playContext.totalPayout;

        return true;
    }

    protected balanceConditionMetForOnePlay(playContext: QuestPlayContext): boolean {
        return true;
    }

    protected balanceConditionMetForWholeQuest(playContext: QuestPlayContext): boolean {
        return true;
    }

    protected payoutConditionMetForWholeQuest(playContext: QuestPlayContext): boolean {
        return this.totalPayout >= 300;
    }

    public reset() {
        super.reset();
        this.totalPayout = 0;
    }
}