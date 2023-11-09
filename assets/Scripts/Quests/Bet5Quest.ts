import Quest from './Quest';
import QuestPlayContext from './QuestPlayContext';

export default class Bet5Quest extends Quest {
    constructor() {
        super(3, 'Не уйди в минус');
    }

    protected payoutConditionMetForOnePlay(playContext: QuestPlayContext) {
        return true;
    }

    protected balanceConditionMetForOnePlay(playContext: QuestPlayContext): boolean {
        return true;
    }

    protected balanceConditionMetForWholeQuest(playContext: QuestPlayContext): boolean {
        return playContext.newBalance >= playContext.balanceBeforeQuest;
    }

    protected payoutConditionMetForWholeQuest(playContext: QuestPlayContext): boolean {
        return true;
    }
}