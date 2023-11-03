import { _decorator, assert, Button, Component, debug, instantiate, Label, log, Node, Prefab, Sprite, Toggle, UITransform } from 'cc';
const { ccclass, property } = _decorator;

import Bet from './Bets/Bet';
import BetType from './Bets/BetType';
import BetTable from './Bets/BetTable';

import { extractNumbersFromString } from './Helper';
import Challenge1 from './Challenges/Challenge1';

@ccclass('Game')
export class Game extends Component {
    @property(Label)
    private balanceLabel: Label = null!;

    @property(Label)
    private winLabel: Label = null!;

    @property(Label)
    private betLabel: Label = null!;

    @property(Label)
    private winNumberLabel: Label = null!;

    @property(Prefab)
    private betSpriteNodePrefab: Prefab = null!;

    private betTable: BetTable = new BetTable();
    private betSpriteNodes: Map<Bet, Node> = new Map();

    //
    // Challenge
    //
    @property(Node)
    private straightBetButtonsNode: Node = null!;

    @property(Node)
    private aroundStraightBetButtonsNode: Node = null!;

    @property([Node])
    private columnBetButtonsNodes: Node[] = [];

    @property([Node])
    private dozenBetButtonsNodes: Node[] = [];

    private betButtonsByTypes: Map<BetType, Button[]> = new Map();

    @property(Button)
    private straightZeroBetButton: Button = null!;

    @property(Label)
    private challengePassedLabel: Label = null!;

    private currentChallenge: Challenge1 | null = null!;
    private challengeButton: Button = null!;
    // End Challenge

    start() {
        this.betTable.balance = 1000;
        this.betTable.setChipValue(1);
        this.betTable.minBet = 5;
        this.betTable.maxBet = 1000;

        this.showNewBalanceValue();

        // 
        // Challenge
        // 
        this.collectBetButtons();
        // End Challenge
    }

    update(deltaTime: number) {
    }

    //
    // Универсальный обработчик для любой кнопки ставки.
    //

    onAnyBetButtonClick(event: Event, customEventData: string, betType: BetType) {
        console.log('onAnyBetButtonClick');

        assert(event.target instanceof Node);

        const bet = this.betTable.onBetButtonClick(betType, customEventData);
        const betSpriteNode = this.getOrCreateBetSpriteNode(bet, event.target as Node);
        this.displayBetSumOnSpriteNode(bet, betSpriteNode);

        log('balance: ' + this.betTable.balance);

        this.showNewBalanceValue();
        this.showNewBetValue();
    }

    // 
    // Обработчики кнопок внешних ставок.
    // 
    // Колбэки разделены по виду ставки, чтобы иметь возможность
    // создать правильный экземпляр ставки при первом нажатии,
    // когда ставка еще не существует в BetTable.
    // 

    onRedBetButtonClick(event: Event, customEventData: string) {
        console.log('onRedBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Red);
    }

    onBlackBetButtonClick(event: Event, customEventData: string) {
        console.log('onBlackBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Black);
    }

    onDozen1stBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen1stBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Dozen1st);
    }

    onDozen2ndBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen2ndBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Dozen2nd);
    }

    onDozen3rdBetButtonClick(event: Event, customEventData: string) {
        console.log('onDozen3rdBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Dozen3rd);
    }

    onLowBetButtonClick(event: Event, customEventData: string) {
        console.log('onLowBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Low);
    }

    onEvenBetButtonClick(event: Event, customEventData: string) {
        console.log('onEvenBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Even);
    }

    onHighBetButtonClick(event: Event, customEventData: string) {
        console.log('onHighBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.High);
    }

    onOddBetButtonClick(event: Event, customEventData: string) {
        console.log('onOddBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Odd);
    }

    onColumn1stBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn1stBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Column1st);
    }

    onColumn2ndBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn2ndBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Column2nd);
    }

    onColumn3rdBetButtonClick(event: Event, customEventData: string) {
        console.log('onColumn3rdBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Column3rd);
    }

    // 
    // Обработчики кнопок внутренних ставок.
    // 

    onStraightBetButtonClick(event: Event, customEventData: string) {
        console.log('onStraightBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Straight);
    }

    onSplitBetButtonClick(event: Event, customEventData: string) {
        console.log('onSplitBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Split);
    }

    onStreetBetButtonClick(event: Event, customEventData: string) {
        console.log('onStreetBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Street);
    }

    onCornerBetButtonClick(event: Event, customEventData: string) {
        console.log('onCornerBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Corner);
    }

    onLineBetButtonClick(event: Event, customEventData: string) {
        console.log('onLineBetButtonClick');

        this.onAnyBetButtonClick(event, customEventData, BetType.Line);
    }

    //
    // Кнопки управления.
    //

    // Выбор фишки.
    onChipToggleClick(toggle: Toggle, customEventData: string) {
        log('onChipToggleClick: ' + customEventData);
        this.betTable.setChipValue(parseInt(customEventData));
    }

    // Отмена последней ставки (или серии ставок, если это было удвоение).
    onUndoButtonClick(event: Event) {
        log('onUndoButtonClick');

        const lastBets = this.betTable.undoLastBet();
        for (let bet of lastBets) {
            const betSpriteNode = this.betSpriteNodes.get(bet);
            assert(betSpriteNode);
            this.displayBetSumOnSpriteNode(bet, betSpriteNode);
        }

        this.showNewBalanceValue();
        this.showNewBetValue();
    }

    // Удвоение ставок.
    onDoubleButtonClick(event: Event) {
        log('onDoubleButtonClick');

        const doubledBets = this.betTable.doubleAll();
        for (let bet of doubledBets) {
            const betSpriteNode = this.betSpriteNodes.get(bet);
            assert(betSpriteNode);
            this.displayBetSumOnSpriteNode(bet, betSpriteNode);
        }

        this.showNewBalanceValue();
        this.showNewBetValue();
    }

    // Разыграть случайное число.
    onSpinButtonClick(event: Event) {
        log('onSpinButtonClick');

        // [0, 36]
        const winNumber = Math.floor(Math.random() * 37);
        const winPayout = this.betTable.getTotalPayout(winNumber);

        this.winNumberLabel.string = winNumber.toString();

        this.winLabel.string = winPayout.toString();
        this.showNewBalanceValue();

        this.hideAllBetSpriteNodes(); // Поскольку ставки отыграли, ноды больше не актуальны. Новые ставки снова их покажут.

        // Значение this.betTable.totalBet сейчас равно нулю, но мы его не обновляем и оставляем на экране
        // как информацию о предедущей ставке и текущем выигрыше.

        //
        // Challenge
        //
        if (this.currentChallenge) {
            const isPassed = this.currentChallenge.isPassed(winPayout);
            this.challengeButton.interactable = true;
            log('isPassed: ' + isPassed);
            this.challengePassedLabel.string = isPassed ? '1' : '0';
            this.currentChallenge = null;
        }
        // End Challenge
    }

    //
    // Вспомогательные методы.
    //

    private showNewBalanceValue() {
        this.balanceLabel.string = this.betTable.balance.toString();
    }

    private showNewBetValue() {
        this.betLabel.string = this.betTable.totalBet.toString();
    }

    private hideAllBetSpriteNodes() {
        this.betSpriteNodes.forEach(node => {
            node.active = false;
        });
    }

    private displayBetSumOnSpriteNode(bet: Bet, node: Node) {
        node.active = true; // Нода может быть не активна после последнего розыгрыша.

        const betSumLabel = node.getComponentInChildren(Label);
        assert(betSumLabel);
        betSumLabel.string = bet.sum.toString();

        if (bet.sum === 0) {
            node.active = false;
        }
    }

    /**
     * @param bet 
     * @param parent родительский узел, в данном случае - это кнопка, связанная с конкретной ставкой.
     */
    private getOrCreateBetSpriteNode(bet: Bet, parent: Node): Node {
        log('getOrCreateBetSpriteNode');

        let betSpriteNode = this.betSpriteNodes.get(bet);
        if (!betSpriteNode) {
            betSpriteNode = instantiate(this.betSpriteNodePrefab);
            betSpriteNode.setParent(parent);    // Привязываем к кнопке, чтобы позиционировать спрайт относительно её СК.

            this.betSpriteNodes.set(bet, betSpriteNode);
        }

        return betSpriteNode;
    }

    // 
    // Challenge
    // 

    // Принять челлендж.
    onAcceptChallengeButtonClick(event: Event) {
        log('onAcceptChallengeButtonClick');

        // Деактивируем кнопку до завершения челленджа.
        assert(event.target instanceof Node);
        const button = (event.target as Node).getComponent(Button);
        assert(button)
        button.interactable = false;
        this.challengeButton = button;

        this.currentChallenge = new Challenge1(1000);
        this.deactivateBetButtonsForChallenge();
    }

    // Деактивирует некоторые кнопки ставок в UI на время челленджа.
    private deactivateBetButtonsForChallenge() {
        assert(this.currentChallenge);
        const allowedBetTypes = this.currentChallenge.allowedBetTypes;
        this.betButtonsByTypes.forEach((buttons, betType) => {
            if (!allowedBetTypes.find(allowedType => allowedType === betType)) {
                buttons.forEach(button => button.interactable = false);
            }
        });
    }

    // Собирает кнопки по контейнерам.
    private collectBetButtons() {
        log('collectBetButtons');

        // Собрать кнопки стрейтов.
        const straightBetButtons: Button[] = [];
        straightBetButtons.push(this.straightZeroBetButton);
        for (const child of this.straightBetButtonsNode.children) {
            const button = child.getComponent(Button);
            assert(button);
            straightBetButtons.push(button);
        }
        this.betButtonsByTypes.set(BetType.Straight, straightBetButtons);

        // Собрать кнопки ставок вокруг стрейтов: сплиты, корнеры, стриты и лайны.
        const splitButtons: Button[] = [];
        const streetButtons: Button[] = [];
        const cornerButtons: Button[] = [];
        const lineButtons: Button[] = [];
        for (const child of this.aroundStraightBetButtonsNode.children) {
            child.children.forEach(subChild => {
                subChild.children.forEach(buttonNode => {
                    let button: Button | null;
                    switch (buttonNode.name) {
                        case 'SplitBet Button':
                            button = buttonNode.getComponent(Button);
                            assert(button);
                            splitButtons.push(button);
                            break;
                        case 'StreetBet Button':
                            button = buttonNode.getComponent(Button);
                            assert(button);
                            streetButtons.push(button);
                            break;
                        case 'CornerBet Button':
                            button = buttonNode.getComponent(Button);
                            assert(button);
                            cornerButtons.push(button);
                            break;
                        case 'LineBet Button':
                            button = buttonNode.getComponent(Button);
                            assert(button);
                            lineButtons.push(button);
                    }
                });
            });
        }
        this.betButtonsByTypes.set(BetType.Split, splitButtons);
        this.betButtonsByTypes.set(BetType.Street, streetButtons);
        this.betButtonsByTypes.set(BetType.Corner, cornerButtons);
        this.betButtonsByTypes.set(BetType.Line, lineButtons);

        // Собрать Columns.
        const column3rdBetButton = this.columnBetButtonsNodes[0].getComponent(Button);
        const column2ndBetButton = this.columnBetButtonsNodes[1].getComponent(Button);
        const column1stBetButton = this.columnBetButtonsNodes[2].getComponent(Button);

        assert(column3rdBetButton);
        assert(column2ndBetButton);
        assert(column1stBetButton);
        this.betButtonsByTypes.set(BetType.Column3rd, [column3rdBetButton]);
        this.betButtonsByTypes.set(BetType.Column2nd, [column2ndBetButton]);
        this.betButtonsByTypes.set(BetType.Column1st, [column1stBetButton]);

        // Собрать Dozens.
    }
    // End Challenge
}