import { log } from "cc";

/**
 * Игровой контекст во время квеста.
 * Используется Quest для проверки выполнения квеста.
 */
export default class QuestPlayContext {
    public balanceBeforeQuest: number = 0;
    public totalBet: number = 0;
    public totalPayout: number = 0;
}