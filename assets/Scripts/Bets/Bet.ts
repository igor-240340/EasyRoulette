export default abstract class Bet {
    protected betNumbers: number[]    // Номера, на которые сделана ставка.
    protected sum: number

    constructor(betNumbers: number[], sum: number) {
        this.betNumbers = betNumbers
        this.sum = sum
    }

    public GetPayout(winNumber: number): number {
        if (this.betNumbers.includes(winNumber))
            return this.CalcPayout()
        else
            return 0
    }

    protected abstract CalcPayout(): number
}
