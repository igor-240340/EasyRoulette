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
        log('playContext.totalBet ' + playContext.totalBet);
        log('playContext.totalPayout ' + playContext.totalPayout);

        if (--this.playsLeft === 0) {
            this.isPassed = true;
        }

        return this.playsLeft;
    }

    public reset() {
        this.playsLeft = this.numberOfPlays;
        this.isPassed = false;
    }
}