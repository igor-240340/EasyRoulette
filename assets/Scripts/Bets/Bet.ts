import assert from '../Helper'

export default abstract class Bet {
    public static MIN_NUMBER: number = 0
    public static MAX_NUMBER: number = 36

    protected numbers: number[]    // Номера, на которые сделана ставка.
    protected sum: number

    constructor(numbers: number[], sum: number) {
        numbers.forEach(number => assert(number >= Bet.MIN_NUMBER && number <= Bet.MAX_NUMBER))
        assert(sum > 0)

        this.numbers = numbers
        this.sum = sum
    }

    public GetPayout(winNumber: number): number {
        if (this.numbers.includes(winNumber)) {
            return this.CalcPayout()
        }
        else {
            return 0
        }
    }

    protected abstract CalcPayout(): number
}
