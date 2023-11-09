import Quest from './Quest';
import QuestPlayContext from './QuestPlayContext';

// Выиграй 100.
export default class Bet2Quest extends Quest {
    constructor() {
        super(1, 'Выиграй 100');
    }

    protected payoutConditionMetForOnePlay(playContext: QuestPlayContext) {
        return playContext.totalPayout >= 100;
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