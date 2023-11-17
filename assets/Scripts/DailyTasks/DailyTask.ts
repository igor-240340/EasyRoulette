import { assert } from "cc";

export default abstract class DailyTask {
    protected name: string = '';
    protected targetCount: number = 0;    // Задача должна быть решена столько раз.
    protected targetSum: number = 0;      // Сумма фишек, которая должна быть выиграна.
    protected rewardSum: number = 0;      // Сумма вознаграждения за выполнение задания.

    private currentCount: number = 0;
    private currentSum: number = 0;

    public getName(): string {
        return this.name;
    }

    /**
     * Возвращает либо сумму, которую нужно выиграть, либо количество раз.
     * Если сумма ненулевая, то подразумевается, что нужно набрать нужную сумму только один раз.
     * 
     * @returns целевой параметр как строка
     */
    public getTargetNumberAsString(): string {
        return (this.targetCount | this.targetSum).toString();
    }

    public getRewardSumAsString(): string {
        return this.rewardSum.toString();
    }

    public increaseCountByOne() {
        this.currentCount++;
    }

    public getCurrentCountScaled() {
        return this.currentCount / this.targetCount;
    }

    public getCurrentCount() {
        return this.currentCount;
    }
}