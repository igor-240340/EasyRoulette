export default abstract class Bet {
    protected winNumbers: number[]    // Номера, при которых ставка сыграет.
    protected sum: number

    constructor(winNumbers: number[], sum: number) {
        this.winNumbers = winNumbers
        this.sum = sum
    }

    public GetPayout(winNumber: number): number {
        if (this.winNumbers.includes(winNumber))
            return this.CalcPayout()
        else
            return 0
    }

    protected abstract CalcPayout(): number
}
