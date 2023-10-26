import Bet from './Bet'

export default class BetManager {
    private bets: Bet[] = []

    public makeBet(bet: Bet) {
        this.bets.push(bet)
    }

    public getTotalPayout(winNumber: number): number {
        let totalPayout = 0
        for (let bet of this.bets) {
            totalPayout += bet.getPayout(winNumber)
        }

        return totalPayout
    }

    public clear() {
        this.bets = []
    }
}
