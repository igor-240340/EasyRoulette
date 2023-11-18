import BetType from "../Bets/BetType";
import DailyTask, { TargetNumberType } from "./DailyTask";
import LastPlayContext from "./LastPlayContext";

export default class DailyTask1 extends DailyTask {
    constructor() {
        super();
        this.name = 'Поставить на красное и выиграть';
        this.targetNumber = 3;
        this.targetNumberType = TargetNumberType.PLAY_COUNTER;
        this.rewardSum = 12000;
    }

    public updateProgress(lastPlayContext: LastPlayContext): void {
        const redBetUniqueKeyAsInBetTable = BetType.Red + ':_';
        const redBetPayout = lastPlayContext.getPayoutByBet(redBetUniqueKeyAsInBetTable);
        if (redBetPayout > 0) {
            if (++this.currentNumber === this.targetNumber) {
                this.isCompleted = true;
            }
        }
    }
}