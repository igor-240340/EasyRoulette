import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import BetType from './Bets/BetType';
import BetTable from './Bets/BetTable';

import { extractNumbersFromString } from './Helper';

@ccclass('Game')
export class Game extends Component {
    private betTable: BetTable = new BetTable()

    // Player data
    private balance: number = 1000
    private currentChipValue: number = 5
    // End

    start() {
    }

    update(deltaTime: number) {
    }

    // 
    // Обработчики кнопок внешних ставок.
    // 
    // Колбэки разделены по признаку вида ставки, чтобы иметь возможность
    // создать правильный экземпляр ставки при первом нажатии,
    // когда ставка еще не существует в BetTable.
    // 
    onRedBetButtonClick(event: Event, customEventData: string) {
        console.log('onRedBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Red, customEventData)
    }

    onBlackBetButtonClick(event: Event, customEventData: string) {
        console.log('onBlackBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Black, customEventData)
    }

    onDozen1stBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen1stBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Dozen1st, customEventData)
    }

    onDozen2ndBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen2ndBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Dozen2nd, customEventData)
    }

    onDozen3rdBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen3rdBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Dozen3rd, customEventData)
    }

    onLowBetButtonClick(event: Event, customEventData: string) {
        console.log('onLowBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Low, customEventData)
    }

    onEvenBetButtonClick(event: Event, customEventData: string) {
        console.log('onEvenBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Even, customEventData)
    }

    onHighBetButtonClick(event: Event, customEventData: string) {
        console.log('onHighBetButtonClick')

        this.betTable.onBetButtonClick(BetType.High, customEventData)
    }

    onOddBetButtonClick(event: Event, customEventData: string) {
        console.log('onOddBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Odd, customEventData)
    }

    onColumn1stBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn1stBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Column1st, customEventData)
    }

    onColumn2ndBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn2ndBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Column2nd, customEventData)
    }

    onColumn3rdBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn3rdBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Column3rd, customEventData)
    }

    // 
    // Обработчики кнопок внутренних ставок.
    // 
    onStraightBetButtonClick(event: Event, customEventData: string) {
        console.log('onStraightBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Straight, customEventData)
    }

    onSplitBetButtonClick(event: Event, customEventData: string) {
        console.log('onSplitBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Split, customEventData)
    }

    onStreetBetButtonClick(event: Event, customEventData: string) {
        console.log('onStreetBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Street, customEventData)
    }

    onCornerBetButtonClick(event: Event, customEventData: string) {
        console.log('onCornerBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Corner, customEventData)
    }

    onLineBetButtonClick(event: Event, customEventData: string) {
        console.log('onLineBetButtonClick')

        this.betTable.onBetButtonClick(BetType.Line, customEventData)
    }
}