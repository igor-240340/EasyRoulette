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
    public rewardSum: number = 0;

    protected currentRank: AchievementRank = AchievementRank.Zero;
    protected rankToTargetNumber: Map<AchievementRank, number> = new Map();
    protected targetNumberType: TargetNumberType = TargetNumberType.PLAY_COUNTER;
    protected currentNumber: number = 0;

    /**
     * Проверяет, было ли выполнено условие в последней игре.
     * 
     * @param lastPlayContext состояние последней игры
     */
    public abstract updateProgress(lastPlayContext: LastPlayContext): void;

    /**
     * Возвращает целевое значение, необходимое для получения следующего ранга.
     */
    protected get targetNumberForNextRank() {
        const targetNumber = this.rankToTargetNumber.get(this.currentRank + 1);
        assert(targetNumber);
        return targetNumber;
    }

    public getCurrentNumberAsString() {
        return this.currentNumber.toString();
    }

    public getTargetNumberAsString() {
        return this.targetNumberForNextRank.toString();
    }
}