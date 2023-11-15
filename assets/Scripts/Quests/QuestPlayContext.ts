import { log } from "cc";

/**
 * Игровой контекст во время квеста.
 * Используется Quest для проверки выполнения квеста.
 */
export default class QuestPlayContext {
    public totalBetBeforePlay: number = 0;
    public totalPayoutAfterPlay: number = 0;
    public balanceAfterPlay: number = 0;
}