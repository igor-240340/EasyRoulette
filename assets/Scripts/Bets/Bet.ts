import { log } from 'cc'
import assert from '../Helper'

export default abstract class Bet {
    public static MIN_NUMBER: number = 0
    public static MAX_NUMBER: number = 36

    public sum: number = 0

    private betSumHistory: number[] = []

    private min: number
    private max: number
    private numbers: number[]    // Номера, на которые сделана ставка.

    constructor(min: number, max: number, numbers: number[]) {
        numbers.forEach(number => assert(number >= Bet.MIN_NUMBER && number <= Bet.MAX_NUMBER))
        assert(min > 0)
        assert(max >= min)

        this.min = min
        this.max = max
        this.numbers = numbers
    }

    public increase(sum: number, balance: number): number {
        assert(sum > 0)
        assert(balance > 0)

        const betLimit = this.max - this.sum

        let actualIncrease
        if (this.sum === 0 && balance < this.min) {
            actualIncrease = 0
        }
        else if (this.sum === 0 && sum < this.min) {
            actualIncrease = this.min
        }
        else if (balance >= betLimit) {
            actualIncrease = sum <= betLimit ? sum : betLimit
        }
        else {
            actualIncrease = sum <= balance ? sum : balance
        }

        this.sum += actualIncrease
        this.betSumHistory.push(actualIncrease)

        return actualIncrease
    }

    public revertLastIncrease(): number {
        let lastBetSum = this.betSumHistory.pop()
        if (lastBetSum) {
            this.sum -= lastBetSum
            return lastBetSum
        } else {
            return 0
        }
    }

    public double(balance: number): number {
        assert(balance > 0)

        const betLimit = this.max - this.sum

        let actualIncrease = 0
        // Есть пространство для удвоения и есть деньги для удвоения.
        if (betLimit >= this.sum && balance >= this.sum) {
            actualIncrease = this.sum
        }
        // Нет пространства для удвоения, но есть деньги для доведения до лимита.
        else if (betLimit < this.sum && balance >= betLimit) {
            actualIncrease = betLimit
        }

        this.sum += actualIncrease

        return actualIncrease
    }

    public getPayout(winNumber: number): number {
        assert(winNumber >= Bet.MIN_NUMBER && winNumber <= Bet.MAX_NUMBER)

        if (this.numbers.includes(winNumber)) {
            return this.CalcPayout()
        }
        else {
            return 0
        }
    }

    protected abstract CalcPayout(): number
}
