import Achievement, { AchievementRank } from "./Achievement";
import LastPlayContext from "../DailyTasks/LastPlayContext";
import BetType from "../Bets/BetType";
import { assert } from "cc";

export default class Achievement1 extends Achievement {
    constructor() {
        super();
        this.name = 'Красное';
        this.description = 'Поставил на "красное" и выиграл.';

        this.rankToTargetNumber.set(AchievementRank.One, 2);
        this.rankToTargetNumber.set(AchievementRank.Two, 5);
        this.rankToTargetNumber.set(AchievementRank.Three, 10);
        this.rankToTargetNumber.set(AchievementRank.Four, 15);
        this.rankToTargetNumber.set(AchievementRank.Five, 20);

        this.rankToRewardSum.set(AchievementRank.One, 1000);
        this.rankToRewardSum.set(AchievementRank.Two, 5000);
        this.rankToRewardSum.set(AchievementRank.Three, 10000);
        this.rankToRewardSum.set(AchievementRank.Four, 50000);
        this.rankToRewardSum.set(AchievementRank.Five, 100000);
    }

    public updateProgress(lastPlayContext: LastPlayContext): boolean {
        const redBetUniqueKeyAsInBetTable = BetType.Red + ':_';
        const redBetPayout = lastPlayContext.getPayoutByBet(redBetUniqueKeyAsInBetTable);

        let nextRankReached = false;
        if (redBetPayout > 0) {
            if (++this.currentNumber === this.targetNumberForNextRank) {
                this.currentRank++;
                nextRankReached = true;

                const rewardSum = this.rankToRewardSum.get(this.currentRank);
                assert(rewardSum);
                this.unclaimedRewards.set(this.currentRank, rewardSum);
            }
        }

        return nextRankReached;
    }
}