import { _decorator, Component, debug, Label, log, Node, Toggle } from 'cc';
const { ccclass, property } = _decorator;

import BetType from './Bets/BetType';
import BetTable from './Bets/BetTable';

import { extractNumbersFromString } from './Helper';

@ccclass('Game')
export class Game extends Component {
    @property(Label)
    private balanceLabel: Label = null!;

    @property(Label)
    private winLabel: Label = null!;

    private betTable: BetTable = new BetTable();

    start() {
        this.betTable.balance = 100;
        this.betTable.setChipValue(1);

        this.showNewBalanceValue();
    }

    update(deltaTime: number) {
    }

    private showNewBalanceValue() {
        this.balanceLabel.string = this.betTable.balance.toString();
    }

    // 
    // Обработчики кнопок внешних ставок.
    // 
    // Колбэки разделены по признаку вида ставки, чтобы иметь возможность
    // создать правильный экземпляр ставки при первом нажатии,
    // когда ставка еще не существует в BetTable.
    // 
    onRedBetButtonClick(event: Event, customEventData: string) {
        console.log('onRedBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Red, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onBlackBetButtonClick(event: Event, customEventData: string) {
        console.log('onBlackBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Black, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onDozen1stBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen1stBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Dozen1st, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onDozen2ndBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen2ndBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Dozen2nd, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onDozen3rdBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen3rdBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Dozen3rd, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onLowBetButtonClick(event: Event, customEventData: string) {
        console.log('onLowBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Low, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onEvenBetButtonClick(event: Event, customEventData: string) {
        console.log('onEvenBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Even, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onHighBetButtonClick(event: Event, customEventData: string) {
        console.log('onHighBetButtonClick');

        this.betTable.onBetButtonClick(BetType.High, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onOddBetButtonClick(event: Event, customEventData: string) {
        console.log('onOddBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Odd, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onColumn1stBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn1stBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Column1st, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onColumn2ndBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn2ndBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Column2nd, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onColumn3rdBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn3rdBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Column3rd, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    // 
    // Обработчики кнопок внутренних ставок.
    // 
    onStraightBetButtonClick(event: Event, customEventData: string) {
        console.log('onStraightBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Straight, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onSplitBetButtonClick(event: Event, customEventData: string) {
        console.log('onSplitBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Split, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onStreetBetButtonClick(event: Event, customEventData: string) {
        console.log('onStreetBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Street, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onCornerBetButtonClick(event: Event, customEventData: string) {
        console.log('onCornerBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Corner, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    onLineBetButtonClick(event: Event, customEventData: string) {
        console.log('onLineBetButtonClick');

        this.betTable.onBetButtonClick(BetType.Line, customEventData);
        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
    }

    // Выбор фишки.
    onChipToggleClick(toggle: Toggle, customEventData: string) {
        log('onChipToggleClick: ' + customEventData);
        this.betTable.setChipValue(parseInt(customEventData));
    }

    // Отмена последней ставки.
    onUndoButtonClick(event: Event) {
        log('onUndoButtonClick');

        this.betTable.undoLastBet();

        this.showNewBalanceValue();
    }

    // Удвоение ставок.
    onDoubleButtonClick(event: Event) {
        log('onDoubleButtonClick');

        this.betTable.doubleAll();

        this.showNewBalanceValue();
    }

    // Удвоение ставок.
    onSpinButtonClick(event: Event) {
        log('onSpinButtonClick');

        const winNumber = Math.floor(Math.random() * 37)
        log(winNumber)
        const winPayout = this.betTable.getTotalPayout(winNumber)

        this.winLabel.string = winPayout.toString();
        this.showNewBalanceValue();
    }
}