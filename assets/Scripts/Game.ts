import { _decorator, assert, Component, log, Node } from 'cc';
import BetManager from './Bets/BetManager';
import RedBet from './Bets/OutsideBets/RedBet';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    private betManager: BetManager = new BetManager()

    // Player data
    private balance: number = 1000
    private currentChipValue: number = 5
    // End

    start() {
    }

    update(deltaTime: number) {
    }

    /*
     * Обработчики кнопок внешних ставок.
     */
    onRedBetButtonClick(event: Event, customEventData: string) {
        console.log('onRedBetButtonClick')
    }

    onBlackBetButtonClick(event: Event, customEventData: string) {
        console.log('onBlackBetButtonClick')
    }

    onDozen1stBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen1stBetButtonClick')
    }

    onDozen2ndBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen2ndBetButtonClick')
    }

    onDozen3rdBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen3rdBetButtonClick')
    }

    onLowBetButtonClick(event: Event, customEventData: string) {
        console.log('onLowBetButtonClick')
    }

    onEvenBetButtonClick(event: Event, customEventData: string) {
        console.log('onEvenBetButtonClick')
    }

    onHighBetButtonClick(event: Event, customEventData: string) {
        console.log('onHighBetButtonClick')
    }

    onOddBetButtonClick(event: Event, customEventData: string) {
        console.log('onOddBetButtonClick')
    }

    onColumn1stBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn1stBetButtonClick')
    }

    onColumn2ndBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn2ndBetButtonClick')
    }

    onColumn3rdBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn3rdBetButtonClick')
    }

    /*
     * Обработчики кнопок внутренних ставок.
     */
    onStraightBetButtonClick(event: Event, customEventData: string) {
        console.log('onStraightBetButtonClick')

        // Извлечение номеров и ассерты.
        const number = parseInt(customEventData)
        this.assert(number <= 36 && number >= 0)
        console.log('number: ' + number)

        // Создание ставки.
    }

    onSplitBetButtonClick(event: Event, customEventData: string) {
        console.log('onSplitBetButtonClick')

        // Извлечение номеров и ассерты.
        const numbers: number[] = customEventData.split(',').map(numberString => parseInt(numberString))
        this.assert(numbers.length == 2)
        numbers.forEach(number => this.assert(number <= 36 && number >= 0))
        console.log('numbers: ' + numbers)

        // Создание ставки.
    }

    onStreetBetButtonClick(event: Event, customEventData: string) {
        console.log('onStreetBetButtonClick')

        // Извлечение номеров и ассерты.
        const numbers: number[] = customEventData.split(',').map(numberString => parseInt(numberString))
        this.assert(numbers.length == 3)
        numbers.forEach(number => this.assert(number <= 36 && number >= 0))
        console.log('numbers: ' + numbers)

        // Создание ставки.
    }

    onCornerBetButtonClick(event: Event, customEventData: string) {
        console.log('onCornerBetButtonClick')

        // Извлечение номеров и ассерты
        const numbers: number[] = customEventData.split(',').map(numberString => parseInt(numberString))
        this.assert(numbers.length == 4)
        numbers.forEach(number => this.assert(number <= 36 && number >= 0))
        console.log('numbers: ' + numbers)

        // Создание ставки.
    }

    onLineBetButtonClick(event: Event, customEventData: string) {
        console.log('onLineBetButtonClick')

        // Извлечение номеров и ассерты
        const numbers: number[] = customEventData.split(',').map(numberString => parseInt(numberString))
        this.assert(numbers.length == 6)
        numbers.forEach(number => this.assert(number <= 36 && number >= 0))
        console.log('numbers: ' + numbers)

        // Создание ставки.
    }

    private assert(condition: boolean) {
        if (!condition) {
            throw new Error('Assertion Failed');
        }
    }
}