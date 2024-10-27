import { _decorator, assert, Button, Component, find, instantiate, Label, log, Node, Prefab, ProgressBar, Toggle, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

import { ysdk } from 'db://yandex-games-sdk/ysdk';

import Bet from './Bets/Bet';
import BetType from './Bets/BetType';
import BetTable from './Bets/BetTable';

import DefaultBetLimitConfig from './Bets/BetLimits/DefaultBetLimitConfig';

@ccclass('Game')
export class Game extends Component {

    //
    // Свойства.
    //

    @property(Label)
    private balanceLabel: Label = null!;

    @property(Label)
    private betLabel: Label = null!;

    @property(Prefab)
    private betSpriteNodePrefab: Prefab = null!;

    @property(Node)
    private canvasNode: Node = null!;

    @property(Prefab)
    private lastWinNumBlackPrefab: Prefab = null!;

    @property(Prefab)
    private lastWinNumRedPrefab: Prefab = null!;

    @property(Prefab)
    private lastWinNumGreenPrefab: Prefab = null!;

    @property(Node)
    private winNumberHistoryContainer: Node = null!;

    // BEGIN: Модальное окно с выигрышем.
    @property(Node)
    private winNumModal: Node = null!;

    @property(Node)
    private winNumSpriteContainer: Node = null!;

    @property(Node)
    private wonLabelNode: Node = null!;

    @property(Label)
    private amountLabel: Node = null!;
    // END

    @property(AudioSource)
    musicSource: AudioSource = null;

    @property([cc.SpriteFrame])
    soundOnSpriteFrames: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    soundOffSpriteFrames: cc.SpriteFrame[] = [];

    //
    // Переменные.
    //

    private numToSpritePrefab: Map<number, Prefab> = new Map();

    private betTable = new BetTable(new DefaultBetLimitConfig());
    private betSpriteNodes: Map<Bet, Node> = new Map();

    private musicIsPlaying: bool = false;

    start() {
        this.betTable.balance = 10000;
        this.betTable.setChipValue(1);

        this.showNewBalanceValue();

        this.linkNumWithSpritePrefab();

        // NOTE: Тест маппинга числа в префаб с его цветом.
        // for (let i = 0; i < 37; i++) {
        //     this.addLastWinNumberToHistory(i);
        // }
    }

    /**
     * С каждым номером связывает префаб,
     * содержащий спрайт, цвет которого соответствует номеру.
     */
    private linkNumWithSpritePrefab() {
        this.numToSpritePrefab.set(0, this.lastWinNumGreenPrefab);

        for (let i = 1; i < 37; i++) {
            let spritePrefab;

            // Первая или третья группа из девяти чисел.
            if (i < 10 || ( i > 18 && i < 28)) {
                spritePrefab = (i%2 === 0)
                ? this.lastWinNumBlackPrefab
                : this.lastWinNumRedPrefab;
            }
            // Вторая группа из девяти чисел за исключением 10 или четвертая группа из девяти чисел за исключением 28.
            // NOTE: В этих группах, кроме указанных чисел, красные - четные, черные - нечетные.
            else if (((i > 9 && i < 19) && i !== 10) || (i > 27 && i !== 28)) {
                spritePrefab = (i%2 === 0)
                ? this.lastWinNumRedPrefab
                : this.lastWinNumBlackPrefab;
            }
            else if (i === 10 || i === 28) {
                spritePrefab = this.lastWinNumBlackPrefab;
            }

            this.numToSpritePrefab.set(i, spritePrefab);
        }
    }

    update(deltaTime: number) {
    }

    //
    // Универсальный обработчик для любой кнопки ставки.
    //

    onAnyBetButtonClick(event: Event, customEventData: string, betType: BetType) {
        console.log('onAnyBetButtonClick');

        if (this.betTable.balance === 0) {
            console.log('not enough money');
            return;
        }

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

        if (this.betTable.balance === 0) {
            log('not enough money');
            return;
        }

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

        this.showNewBalanceValue();

        this.hideAllBetSpriteNodes(); // Поскольку ставки отыграли, ноды больше не актуальны. Новые ставки снова их покажут.

        this.addLastWinNumberToHistory(winNumber);

        // Показываем модальное окно.
        this.wonLabelNode.active = (winPayout > 0);
        this.amountLabel.node.active = (winPayout > 0);
        this.amountLabel.string = winPayout.toString();
        this.winNumSpriteContainer.removeAllChildren();
        const numSpriteNode = this.getSpriteNodeForWinNumber(winNumber);
        numSpriteNode.setParent(this.winNumSpriteContainer);
        this.winNumModal.active = true;
        
        // NOTE: Значение this.betTable.totalBet сейчас равно нулю, но мы его не обновляем и оставляем на экране
        // как информацию о предедущей ставке и текущем выигрыше.
    }

    private addLastWinNumberToHistory(winNumber: number) {
        // Максимальное количество чисел в истории.
        const containerCapacityLimit = 7;
        // Если контейнер уже заполнен, удаляем первый элемент слева.
        const historyNodes = this.winNumberHistoryContainer.children;
        if (historyNodes.length === containerCapacityLimit) {
            this.winNumberHistoryContainer.removeChild(historyNodes[0]);
        }

        const numberSpriteNode = this.getSpriteNodeForWinNumber(winNumber);
        numberSpriteNode.setParent(this.winNumberHistoryContainer);
    }

    private getSpriteNodeForWinNumber(winNumber: number) {
        const spritePrefab = this.numToSpritePrefab.get(winNumber);
        const numberNode = instantiate(spritePrefab);
        const numberLabel = numberNode.getChildByName('Label')?.getComponent(Label);
        assert(numberLabel);
        numberLabel.string = winNumber;

        return numberNode;
    }

    onMusicToggleCheck(toggle: Toggle, customEventData: string) {
        if (toggle.isChecked) {
            this.musicSource.play();

            // Меняем спрайты на изображение активного динамика.
            toggle.normalSprite = this.soundOnSpriteFrames[0];
            toggle.hoverSprite = this.soundOnSpriteFrames[1];
            toggle.pressedSprite = this.soundOnSpriteFrames[2];
        } else {
            this.musicSource.stop();

            // Меняем спрайты на изображение неактивного динамика.
            toggle.normalSprite = this.soundOffSpriteFrames[0];
            toggle.hoverSprite = this.soundOffSpriteFrames[1];
            toggle.pressedSprite = this.soundOffSpriteFrames[2];
        }
    }

    //
    // Вспомогательные методы.
    //

    private showNewBalanceValue() {
        this.balanceLabel.string = `Balance: ${this.betTable.balance.toString()}`;
    }

    private showNewBetValue() {
        this.betLabel.string = `Bet: ${this.betTable.totalBet.toString()}`;
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

            // NOTE: кнопки вторичных ставок (split/corner/street/line) в финальной версии прозрачные,
            // поэтому мы не можем сделать фишки дочерними элементами кнопок, т.к. они тоже станут прозрачными.
            // betSpriteNode.setParent(parent);    // Привязываем к кнопке, чтобы позиционировать спрайт относительно её СК.
            betSpriteNode.parent = parent.parent;   // Привязываем фишку к родителю кнопки, который является нодой-враппером.

            this.betSpriteNodes.set(bet, betSpriteNode);
        }

        return betSpriteNode;
    }

    //
    // Интеграция с YandexGames.
    //

    onRewardButtonClick(button: Button) {
        console.log('onRewardButtonClick');

        const rewardSum = 1000;

        const callbacks = {
            onRewarded: () => {
                this.betTable.balance += rewardSum;
                this.showNewBalanceValue();
            }
        };

        ysdk.adv.showRewardedVideo({ callbacks });
    }
}