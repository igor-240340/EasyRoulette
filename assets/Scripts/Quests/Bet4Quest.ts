import Quest from './Quest';
import QuestPlayContext from './QuestPlayContext';

export default class Bet4Quest extends Quest {
    constructor() {
        super(3, 'Сыграй 3 игры');
    }

    protected payoutConditionMetForOnePlay(playContext: QuestPlayContext) {
        return true;
    }

    protected balanceConditionMetForOnePlay(playContext: QuestPlayContext): boolean {
        return true;
    }

    protected balanceConditionMetForWholeQuest(playContext: QuestPlayContext): boolean {
        return true;
    }

    protected payoutConditionMetForWholeQuest(playContext: QuestPlayContext): boolean {
        return true;
    }
}