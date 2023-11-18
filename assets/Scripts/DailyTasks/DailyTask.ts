import { assert } from "cc";
import LastPlayContext from "./LastPlayContext";

// Определяет, является ли целевой числовой параметр счетчиком игр или суммой фишек.
export const enum TargetNumberType {
    PLAY_COUNTER,
    CHIP_SUM
}

export default abstract class DailyTask {
    public isCompleted: boolean = false;

    protected name: string = '';
    protected rewardSum: number = 0;

    protected targetNumber: number = 0; // Целевое числовое значение необходимое для выполнения задачи.
    protected targetNumberType: TargetNumberType = TargetNumberType.PLAY_COUNTER;
    protected currentNumber: number = 0;

    public getName(): string {
        return this.name;
    }

    /**
     * Возвращает целевое числовое значение в виде строки.
     * Если это сумма фишек, то при необходимости округляет.
     * 
     * @returns целевой параметр как строка
     */
    public getTargetNumberAsString(): string {
        const isChipSum = this.targetNumberType === TargetNumberType.CHIP_SUM;
        return isChipSum ? this.targetNumber.toString() : this.targetNumber.toString();
    }

    public getRewardSum(): number {
        return this.rewardSum;
    }

    public getRewardSumAsString(): string {
        return this.rewardSum.toString();
    }

    public getCurrentNumberScaled() {
        return this.currentNumber / this.targetNumber;
    }

    public getCurrentNumberAsString(): string {
        return this.currentNumber.toString();
    }

    /**
     * Проверяет, было ли выполнено условие задачи в последней игре.
     * 
     * @param lastPlayContext состояние последней игры
     */
    public abstract updateProgress(lastPlayContext: LastPlayContext): void;
}