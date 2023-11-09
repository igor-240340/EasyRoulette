import Quest from './Quest';
import QuestPlayContext from './QuestPlayContext';

// Сделать любую ставку.
export default class FirstBetQuest extends Quest {
    constructor() {
        super(1, 'Первая ставка');
    }

    protected payoutConditionMetForOnePlay(playContext: QuestPlayContext): boolean {
        return true;
    }

    protected balanceConditionMetForOnePlay(playContext: QuestPlayContext): boolean {
        return true;
    }
}