import BetType from "./BetType"
import Bet from "./Bet"

import assert from "../Helper"

import Column1stBet from "./OutsideBets/Column1stBet"
import Column2ndBet from "./OutsideBets/Column2ndBet"
import Column3rdBet from "./OutsideBets/Column3rdBet"
import Dozen1stBet from "./OutsideBets/Dozen1stBet"
import Dozen2ndBet from "./OutsideBets/Dozen2ndBet"
import Dozen3rdBet from "./OutsideBets/Dozen3rdBet"
import RedBet from "./OutsideBets/RedBet"
import BlackBet from "./OutsideBets/BlackBet"
import LowBet from "./OutsideBets/LowBet"
import HighBet from "./OutsideBets/HighBet"
import EvenBet from "./OutsideBets/EvenBet"
import OddBet from "./OutsideBets/OddBet"

import StraightBet from "./InsideBets/StraightBet"
import SplitBet from "./InsideBets/SplitBet"
import StreetBet from "./InsideBets/StreetBet"
import CornerBet from "./InsideBets/CornerBet"
import LineBet from "./InsideBets/LineBet"
import { log } from "cc"

export default class BetTable {
    private bets: Map<string, Bet> = new Map()
    private undoStack: Bet[][] = [] // Каждый элемент - массив ставок. Такой формат позволяет отменять удвоенные ставки за один раз.

    private chipValue = 5

    public balance = 100

    /**
     * 
     * @param betType 
     * @param payload номера ставки через запятую, если ставка является внутренней.
     */
    public onBetButtonClick(betType: BetType, payload: string | undefined) {
        console.log('onBetButtonClick: ' + betType + ', ' + payload)

        // Пробуем получить экземпляр ставки.
        // Создаем его, если еще не существует.
        const uniqueBetKey = this.formUniqueKey(betType, payload)
        console.log('uniqueBetKey: ' + uniqueBetKey);

        let bet = this.bets.get(uniqueBetKey)
        if (!bet) {
            console.log('bet not found');

            bet = this.instantiateBet(betType, payload)
            this.bets.set(uniqueBetKey, bet)
        }

        const increaseValue = bet.increase(this.chipValue, this.balance)
        if (increaseValue > 0) {
            this.balance -= increaseValue
            this.undoStack.push([bet])
        }
    }

    public setChipValue(value: number) {
        this.chipValue = value
    }

    public getTotalPayout(winNumber: number): number {
        let totalPayout = 0
        this.bets.forEach(bet => {
            totalPayout += bet.getPayout(winNumber)
        })

        this.balance += totalPayout

        this.undoStack = []

        return totalPayout
    }

    public doubleAll() {
        const doubledBets: Bet[] = []
        this.bets.forEach(bet => {
            const increaseValue = bet.double(this.balance)
            if (increaseValue > 0) {
                this.balance -= increaseValue
                doubledBets.push(bet)
            }
        })
        this.undoStack.push(doubledBets)
    }

    public undoLastBet() {
        const lastBets = this.undoStack.pop()
        if (lastBets) {
            lastBets.forEach(bet => {
                this.balance += bet.revertLastIncrease()
            })
        }
    }

    private formUniqueKey(betType: BetType, payload: string | undefined): string {
        // Поскольку внешние ставки в отличие от внутренних существуют только в одном экземпляре,
        // нет необходимости различать экземпляры между собой,
        // поэтому payload с уникальными номерами для внешних ставок не определён.
        return betType + ':' + (payload || '_')
    }

    private instantiateBet(betType: BetType, payload: string | undefined): Bet {
        switch (betType) {
            // Внешние ставки.
            case BetType.Column1st: return new Column1stBet(5, 100)
            case BetType.Column2nd: return new Column2ndBet(5, 100)
            case BetType.Column3rd: return new Column3rdBet(5, 100)
            case BetType.Dozen1st: return new Dozen1stBet(5, 100)
            case BetType.Dozen2nd: return new Dozen2ndBet(5, 100)
            case BetType.Dozen3rd: return new Dozen3rdBet(5, 100)
            case BetType.Red: return new RedBet(5, 100)
            case BetType.Black: return new BlackBet(5, 100)
            case BetType.Low: return new LowBet(5, 100)
            case BetType.High: return new HighBet(5, 100)
            case BetType.Even: return new EvenBet(5, 100)
            case BetType.Odd: return new OddBet(5, 100)

            // Внутренние ставки.
            case BetType.Straight: return new StraightBet(5, 100, [parseInt(payload.trim())])
            case BetType.Split: return new SplitBet(5, 100, payload.split(',').map(item => { return parseInt(item.trim()) }))
            case BetType.Street: return new StreetBet(5, 100, payload.split(',').map(item => { return parseInt(item.trim()) }))
            case BetType.Corner: return new CornerBet(5, 100, payload.split(',').map(item => { return parseInt(item.trim()) }))
            case BetType.Line: return new LineBet(5, 100, payload.split(',').map(item => { return parseInt(item.trim()) }))

            default:
                throw new Error('Invalid BetType')
        }
    }
}
