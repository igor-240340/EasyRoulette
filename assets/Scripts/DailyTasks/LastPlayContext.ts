import { assert } from "cc";

export default class LastPlayContext {
    private uninqueBetKeyToPayout: Map<string, number> = new Map();

    /**
     * Возвращает величину выплаты по ключу ставки.
     * 
     * @param uninqueBetKey строковый ключ ставки в том же формате, что и в BetTable.
     * @returns 
     */
    public getPayoutByBet(uninqueBetKey: string): number {
        if (this.uninqueBetKeyToPayout.has(uninqueBetKey)) {
            const betPayout = this.uninqueBetKeyToPayout.get(uninqueBetKey);
            assert(betPayout !== undefined);
            return betPayout;
        }
        // Если ключа нет, значит игрок ни разу не делал эту ставку.
        else {
            return 0;
        }
    }

    /**
     * Связывает величину выплаты с ключом ставки.
     * 
     * @param uninqueBetKey 
     * @param payout 
     */
    public linkPayoutWithBet(uninqueBetKey: string, payout: number) {
        this.uninqueBetKeyToPayout.set(uninqueBetKey, payout);
    }

    public clear() {
        this.uninqueBetKeyToPayout.clear();
    }
}