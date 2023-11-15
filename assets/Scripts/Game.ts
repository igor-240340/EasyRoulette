import { _decorator, assert, Button, Component, debug, instantiate, Label, log, Node, Prefab, ScrollView, Sprite, Toggle, UITransform } from 'cc';
const { ccclass, property } = _decorator;

import Bet from './Bets/Bet';
import BetType from './Bets/BetType';
import BetTable from './Bets/BetTable';

import QuestPlayContext from './Quests/QuestPlayContext';
import Quest from './Quests/Quest';
import Quest1 from './Quests/Quest1';
import Quest2 from './Quests/Quest2';
import Quest3 from './Quests/Quest3';
import Quest4 from './Quests/Quest4';
import Quest5 from './Quests/Quest5';
import Quest6 from './Quests/Quest6';
import Quest7 from './Quests/Quest7';
import Quest8 from './Quests/Quest8';
import Quest9 from './Quests/Quest9';

@ccclass('Game')
export class Game extends Component {
    // 
    // Базовая игра - рулетка.
    // 

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
    // Квесты.
    //

    @property(Prefab)
    private questCardPrefab: Prefab = null!;

    @property(ScrollView)
    private questScrollView: ScrollView = null!;

    @property(Node)
    private activeQuestCard: Node = null!;

    @property(Label)
    private playsFinishedLabel: Label = null!;

    @property(Label)
    private playsTotalLabel: Label = null!;

    @property(Label)
    private passedLabel: Label = null!;

    @property(Button)
    private closeButton: Button = null!;

    @property(Button)
    private cancelButton: Button = null!;

    private questTuples: [(new (questName: string, inititalBalance: number) => Quest), string][] = [
        [Quest1, 'Первая ставка'],
        [Quest2, 'Выиграй 100'],
        [Quest3, '+100 к балансу'],
        [Quest4, 'Сыграй 3 игры'],
        [Quest5, 'Не уйди в минус'],
        [Quest6, 'Выиграй 300'],
        [Quest7, 'Не уйди в минус'],
        [Quest8, '+100 к балансу'],
        [Quest9, 'Выиграй 300']
    ];
    private activeQuest: Quest | null = null;
    private questPlayContext = new QuestPlayContext();

    start() {
        //
        // Базовая игра.
        // 

        this.betTable.balance = 1000;
        this.betTable.setChipValue(1);
        this.showNewBalanceValue();

        // 
        // Квесты.
        //
        this.instantiateQuestCards();
    }

    update(deltaTime: number) {
    }

    // 
    // Квесты.
    // 

    instantiateQuestCards() {
        for (let questTuple of this.questTuples) {
            const questConstructor = questTuple[0];
            const questName = questTuple[1];

            const questCard = instantiate(this.questCardPrefab);

            const nameLabel = questCard.getChildByName('Name')?.getComponent(Label);
            assert(nameLabel);
            nameLabel.string = questName;

            const acceptButton = questCard.getChildByName('Accept Button')?.getComponent(Button);
            assert(acceptButton);
            acceptButton.node.on(Button.EventType.CLICK, (button: Button) => {
                const quest = new questConstructor(questName, this.betTable.balance);

                log('quest accepted: ' + questName);

                this.activeQuest = quest;

                const nameLabel = this.activeQuestCard.getChildByName('Name')?.getComponent(Label);
                assert(nameLabel);
                nameLabel.string = this.activeQuest.questName;

                let label = this.playsTotalLabel.getComponent(Label);
                assert(label);
                label.string = this.activeQuest.numberOfPlays.toString();

                label = this.playsFinishedLabel.getComponent(Label);
                assert(label);
                label.string = '0';

                label = this.passedLabel.getComponent(Label);
                assert(label);
                label.string = '';

                this.closeButton.node.active = false;
                this.cancelButton.node.active = true;
            });

            this.questScrollView.content?.addChild(questCard);
        }
    }

    // Прерывает текущий квест без учета прогресса.
    onCancelActiveQuest(event: Event, customEventData: string) {
        log('onCancelActiveQuest: ' + this.activeQuest?.questName);

        let label = this.activeQuestCard.getChildByName('Name')?.getComponent(Label);
        assert(label);
        label.string = 'Нет активного квеста';

        label = this.playsTotalLabel.getComponent(Label);
        assert(label);
        label.string = '0';

        label = this.playsFinishedLabel.getComponent(Label);
        assert(label);
        label.string = '0';

        label = this.passedLabel.getComponent(Label);
        assert(label);
        label.string = '';

        this.cancelButton.node.active = false;

        this.activeQuest = null;
    }

    // Очищает детали текущего квеста
    onCloseButtonClick(event: Event, customEventData: string) {
        log('onCloseButtonClick');

        let label = this.activeQuestCard.getChildByName('Name')?.getComponent(Label);
        assert(label);
        label.string = 'Нет активного квеста';

        label = this.playsTotalLabel.getComponent(Label);
        assert(label);
        label.string = '0';

        label = this.playsFinishedLabel.getComponent(Label);
        assert(label);
        label.string = '0';

        label = this.passedLabel.getComponent(Label);
        assert(label);
        label.string = '';

        this.closeButton.node.active = false;
    }

    // End Квесты.

    // 
    // Базовая игра.
    // 

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

        //
        // Квест. 
        // 
        this.questPlayContext.totalBetBeforePlay = this.betTable.totalBet;
        // End Квест.

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
        // Квест
        // 
        if (this.activeQuest) {
            this.questPlayContext.totalPayoutAfterPlay = winPayout;
            this.questPlayContext.balanceAfterPlay = this.betTable.balance;
            const playsLeft = this.activeQuest.handleLastPlay(this.questPlayContext);

            const label = this.playsFinishedLabel.getComponent(Label);
            assert(label);
            label.string = (this.activeQuest.numberOfPlays - playsLeft).toString();

            if (playsLeft === 0 && this.activeQuest.isPassed) {
                log('quest passed');

                const label = this.passedLabel.getComponent(Label);
                assert(label);
                label.string = 'Пройден';

                this.activeQuest = null;

                this.cancelButton.node.active = false;
                this.closeButton.node.active = true;
            } else if (playsLeft === 0 && !this.activeQuest.isPassed) {
                log('quest is not passed');

                const label = this.passedLabel.getComponent(Label);
                assert(label);
                label.string = 'Не пройден';

                this.activeQuest = null;

                this.cancelButton.node.active = false;
                this.closeButton.node.active = true;
            }
        }
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

    // End Базовая игра.
}