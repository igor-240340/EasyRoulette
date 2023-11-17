import DailyTask from "./DailyTask";

export default class DailyTask1 extends DailyTask {
    constructor() {
        super();
        this.name = 'Поставить на красное и выиграть';
        this.targetCount = 3;
        this.rewardSum = 12000;
    }
}