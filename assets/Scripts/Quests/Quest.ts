import { log } from "cc";
import QuestPlayContext from "./QuestPlayContext";

export default abstract class Quest {
    public questName: string = '';
    public numberOfPlays: number = 0;
    public isPassed: boolean = false;

    private playsLeft: number = 0;

    protected totalPayout: number = 0;
    protected inititalBalance: number = 0;
    protected newBalance: number = 0;

    constructor(questName: string, numberOfPlays: number, inititalBalance: number) {
        this.questName = questName;
        this.numberOfPlays = numberOfPlays;
        this.inititalBalance = inititalBalance;

        this.playsLeft = numberOfPlays;
    }

    public handleLastPlay(lastPlayContext: QuestPlayContext): number {
        log('handleLastPlay');

        log('inititalBalance ' + this.inititalBalance);
        log('playContext.newBalance ' + lastPlayContext.balanceAfterPlay);
        log('playContext.totalBet ' + lastPlayContext.totalBetBeforePlay);
        log('playContext.totalPayout ' + lastPlayContext.totalPayoutAfterPlay);

        this.totalPayout += lastPlayContext.totalPayoutAfterPlay;
        this.newBalance = lastPlayContext.balanceAfterPlay;

        if (!this.checkConditionAfterLastPlay()) {
            this.playsLeft = 0;
        }
        else if (--this.playsLeft === 0) {
            this.isPassed = this.checkConditionAfterAllPlays();
        }

        return this.playsLeft;
    }

    // Для одиночной игры условия наложенные на одну игру
    // будут эквивалентны условиям наложенным на весь квест
    // поэтому для единообразия в одиночных играх
    // в этом методе не выполняем никаких проверок.
    protected abstract checkConditionAfterLastPlay(): boolean;

    protected abstract checkConditionAfterAllPlays(): boolean;
}