import { assert } from "cc";
import LastPlayContext from "../DailyTasks/LastPlayContext";

export const enum AchievementRank {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five
}

// Определяет, является ли целевой числовой параметр счетчиком игр или суммой фишек.
export const enum TargetNumberType {
    PLAY_COUNTER,
    CHIP_SUM
}

export default abstract class Achievement {
    public name: string = '';
    public description: string = '';

    protected currentRank: AchievementRank = AchievementRank.Zero;
    protected rankToTargetNumber: Map<AchievementRank, number> = new Map();
    protected targetNumberType: TargetNumberType = TargetNumberType.PLAY_COUNTER;
    protected currentNumber: number = 0;
    protected rankToRewardSum: Map<AchievementRank, number> = new Map();
    protected unclaimedRewards: Map<AchievementRank, number> = new Map();

    /**
     * Проверяет, было ли выполнено условие в последней игре.
     * 
     * @param lastPlayContext состояние последней игры
     */
    public abstract updateProgress(lastPlayContext: LastPlayContext): boolean;

    /**
     * Возвращает целевое значение, необходимое для получения следующего ранга.
     */
    protected get targetNumberForNextRank(): number {
        const targetNumber = this.rankToTargetNumber.get(this.currentRank + 1);
        assert(targetNumber);
        return targetNumber;
    }

    /**
     * Возвращает вознаграждение за достижение следующего ранга.
     */
    protected get rewardSum(): number {
        const rewardSum = this.rankToRewardSum.get(this.currentRank + 1);
        assert(rewardSum);
        return rewardSum;
    }

    public getRewardSumAsString(): string {
        return this.rewardSum.toString();
    }

    public getPrevRewardSumAsString(): string {
        const rewardSum = this.rankToRewardSum.get(this.currentRank);
        assert(rewardSum);
        return rewardSum.toString();
    }

    public getCurrentNumberAsString(): string {
        return this.currentNumber.toString();
    }

    public getTargetNumberAsString(): string {
        return this.targetNumberForNextRank.toString();
    }

    public getPrevTargetNumberAsString(): string {
        const prevTargetNumber = this.rankToTargetNumber.get(this.currentRank);
        assert(prevTargetNumber);
        return prevTargetNumber.toString();
    }

    public getRewardSumForCurrentRank(): number {
        const rewardSum = this.rankToRewardSum.get(this.currentRank);
        assert(rewardSum);
        return rewardSum;
    }

    public getCurrentRank(): AchievementRank {
        return this.currentRank;
    }

    public getRewardForRank(rank: AchievementRank): number {
        const reward = this.unclaimedRewards.get(rank);
        assert(reward);

        this.unclaimedRewards.delete(rank);

        return reward;
    }

    public hasUnclaimedRewards(): boolean {
        return this.unclaimedRewards.size > 0;
    }

    /**
     * Возвращает наименьший из достигнутых рангов, для которых еще не получено вознаграждение.
     */
    public getTheLeastAchievedRank(): AchievementRank {
        const ranks = Array.from(this.unclaimedRewards.keys());
        assert(ranks.length > 0);

        let minRank = ranks[0];
        for (let i = 0; i < ranks.length; i++) {
            if (ranks[i] < minRank) {
                minRank = ranks[i];
            }
        }

        return minRank;
    }
}