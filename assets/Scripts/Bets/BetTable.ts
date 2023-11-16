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
import BetLimitConfig from "./BetLimits/BetLimitConfig"

export default class BetTable {
    private bets: Map<string, Bet> = new Map()
    private undoStack: Bet[][] = [] // Каждый элемент - массив ставок. Такой формат позволяет отменять удвоенные ставки за один раз.
    private betLimitConfig: BetLimitConfig;

    private chipValue = 1

    // TODO: Запретить изменять публичные свойства снаружи (включая объекты, на которые они ссылаются).
    public balance = 0
    public totalBet = 0 // Сумма всех ставок. Сюда суммируется всё, что вычитается из баланса.

    constructor(betLimitConfig: BetLimitConfig) {
        assert(betLimitConfig !== undefined);
        this.betLimitConfig = betLimitConfig;
    }

    /**
     * 
     * @param betType 
     * @param payload номера ставки через запятую, если ставка является внутренней.
     */
    public onBetButtonClick(betType: BetType, payload: string | undefined): Bet {
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
            this.totalBet += increaseValue

            this.undoStack.push([bet])
        }

        return bet
    }

    public doubleAll(): Bet[] {
        const doubledBets: Bet[] = [];
        this.bets.forEach(bet => {
            const increaseValue = bet.double(this.balance);
            if (increaseValue > 0) {
                this.balance -= increaseValue;
                this.totalBet += increaseValue;

                doubledBets.push(bet);
            }
        })

        if (doubledBets.length > 0)
            this.undoStack.push(doubledBets);

        return doubledBets;
    }

    public setChipValue(value: number) {
        assert(value > 0)

        this.chipValue = value
    }

    public getTotalPayout(winNumber: number): number {
        assert(winNumber >= 0 && winNumber <= 36)

        let totalPayout = 0
        this.bets.forEach(bet => {
            totalPayout += bet.getPayout(winNumber)
        })

        this.balance += totalPayout

        this.undoStack = []
        this.totalBet = 0

        return totalPayout
    }

    public undoLastBet(): Bet[] {
        const lastBets = this.undoStack.pop() || [];
        lastBets.forEach(bet => {
            const revertedSum = bet.revertLastIncrease();
            this.balance += revertedSum;
            this.totalBet -= revertedSum;
        });

        return lastBets;
    }

    /**
     * Переключает стол на новые лимиты.
     * 
     * Важно, чтобы все ставки перед удалением были нулевыми,
     * т.е. чтобы переключение на новый конфиг происходило при пустом столе.
     * 
     * @param betLimitConfig 
     */
    public setNewBetLimitConfig(betLimitConfig: BetLimitConfig) {
        this.betLimitConfig = betLimitConfig;

        this.bets.forEach(bet => assert(bet.sum === 0));

        // Мы поменяли конфиг на новый, но если ранее уже делались ставки,
        // то в памяти всё еще есть экземпляры ставок с прежними лимитами.
        // Поэтому удаляем все ставки, чтобы они были созданы заново уже с новыми лимитами.
        this.bets.clear();
    }

    private formUniqueKey(betType: BetType, payload: string | undefined): string {
        // Поскольку внешние ставки в отличие от внутренних существуют только в одном экземпляре,
        // нет необходимости различать экземпляры между собой,
        // поэтому payload с уникальными номерами для внешних ставок не определён.
        return betType + ':' + (payload || '_')
    }

    private instantiateBet(betType: BetType, payload: string | undefined): Bet {
        const [minBet, maxBet] = this.betLimitConfig.getMinMaxBetTupleFor(betType);
        switch (betType) {
            // Внешние ставки.
            case BetType.Column1st: return new Column1stBet(minBet, maxBet);
            case BetType.Column2nd: return new Column2ndBet(minBet, maxBet);
            case BetType.Column3rd: return new Column3rdBet(minBet, maxBet);
            case BetType.Dozen1st: return new Dozen1stBet(minBet, maxBet);
            case BetType.Dozen2nd: return new Dozen2ndBet(minBet, maxBet);
            case BetType.Dozen3rd: return new Dozen3rdBet(minBet, maxBet);
            case BetType.Red: return new RedBet(minBet, maxBet);
            case BetType.Black: return new BlackBet(minBet, maxBet);
            case BetType.Low: return new LowBet(minBet, maxBet);
            case BetType.High: return new HighBet(minBet, maxBet);
            case BetType.Even: return new EvenBet(minBet, maxBet);
            case BetType.Odd: return new OddBet(minBet, maxBet);

            // Внутренние ставки.
            case BetType.Straight: return new StraightBet(minBet, maxBet, [parseInt(payload.trim())]);
            case BetType.Split: return new SplitBet(minBet, maxBet, payload.split(',').map(item => { return parseInt(item.trim()) }));
            case BetType.Street: return new StreetBet(minBet, maxBet, payload.split(',').map(item => { return parseInt(item.trim()) }));
            case BetType.Corner: return new CornerBet(minBet, maxBet, payload.split(',').map(item => { return parseInt(item.trim()) }));
            case BetType.Line: return new LineBet(minBet, maxBet, payload.split(',').map(item => { return parseInt(item.trim()) }));

            default:
                throw new Error('Invalid BetType');
        }
    }
}
