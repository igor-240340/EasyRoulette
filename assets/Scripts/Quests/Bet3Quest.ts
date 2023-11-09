import Quest from './Quest';
import QuestPlayContext from './QuestPlayContext';

export default class Bet3Quest extends Quest {
    constructor() {
        super(1, '+100 к балансу');
    }

    protected payoutConditionMetForOnePlay(playContext: QuestPlayContext) {
        return true;
    }

    protected balanceConditionMetForOnePlay(playContext: QuestPlayContext): boolean {
        return playContext.newBalance >= playContext.balanceBeforeQuest + 100;
    }

    protected balanceConditionMetForWholeQuest(playContext: QuestPlayContext): boolean {
        return true;
    }

    protected payoutConditionMetForWholeQuest(playContext: QuestPlayContext): boolean {
        return true;
    }
}