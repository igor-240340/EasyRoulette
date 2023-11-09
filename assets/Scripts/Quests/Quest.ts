import { log } from "cc";
import QuestPlayContext from "./QuestPlayContext";

export default abstract class Quest {
    public questName: string = '';
    public isPassed: boolean = false;

    public numberOfPlays: number = 0;

    private playsLeft: number = 0;

    constructor(numberOfPlays: number, questName: string) {
        this.numberOfPlays = numberOfPlays;
        this.playsLeft = numberOfPlays;
        this.questName = questName;
    }

    public handlePlay(playContext: QuestPlayContext): number {
        log('handlePlay');

        log('playContext.balanceBeforeQuest ' + playContext.balanceBeforeQuest);
        log('playContext.newBalance ' + playContext.newBalance);
        log('playContext.totalBet ' + playContext.totalBet);
        log('playContext.totalPayout ' + playContext.totalPayout);

        if (--this.playsLeft === 0) {
            let allConditionsMet = this.payoutConditionMetForOnePlay(playContext);
            allConditionsMet &&= this.balanceConditionMetForOnePlay(playContext);
            allConditionsMet &&= this.balanceConditionMetForWholeQuest(playContext);
            allConditionsMet &&= this.payoutConditionMetForWholeQuest(playContext);

            if (allConditionsMet) {
                this.isPassed = true;
            }
        }

        return this.playsLeft;
    }

    public reset() {
        this.playsLeft = this.numberOfPlays;
        this.isPassed = false;
    }

    protected abstract payoutConditionMetForOnePlay(playContext: QuestPlayContext): boolean;

    protected abstract balanceConditionMetForOnePlay(playContext: QuestPlayContext): boolean;

    protected abstract balanceConditionMetForWholeQuest(playContext: QuestPlayContext): boolean;

    protected abstract payoutConditionMetForWholeQuest(playContext: QuestPlayContext): boolean;
}