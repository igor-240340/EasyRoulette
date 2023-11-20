import Achievement, { AchievementRank } from "./Achievement";
import LastPlayContext from "../DailyTasks/LastPlayContext";
import BetType from "../Bets/BetType";

export default class Achievement1 extends Achievement {
    constructor() {
        super();
        this.name = 'Красное';
        this.description = 'Поставил на "красное" и выиграл.';
        this.rewardSum = 10000;

        this.rankToTargetNumber.set(AchievementRank.One, 2);
        this.rankToTargetNumber.set(AchievementRank.Two, 5);
        this.rankToTargetNumber.set(AchievementRank.Three, 10);
        this.rankToTargetNumber.set(AchievementRank.Four, 15);
        this.rankToTargetNumber.set(AchievementRank.Five, 20);
    }

    public updateProgress(lastPlayContext: LastPlayContext): void {
        const redBetUniqueKeyAsInBetTable = BetType.Red + ':_';
        const redBetPayout = lastPlayContext.getPayoutByBet(redBetUniqueKeyAsInBetTable);

        if (redBetPayout > 0) {
            if (++this.currentNumber === this.targetNumberForNextRank) {
                this.currentRank++;
            }
        }
    }
}