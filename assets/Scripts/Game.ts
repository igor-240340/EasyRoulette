import { _decorator, assert, Button, Component, debug, instantiate, Label, log, Node, Prefab, ProgressBar, Sprite, Toggle, UITransform } from 'cc';
const { ccclass, property } = _decorator;

import Bet from './Bets/Bet';
import BetType from './Bets/BetType';
import BetTable from './Bets/BetTable';

import DefaultBetLimitConfig from './Bets/BetLimits/DefaultBetLimitConfig';
import DailyTask from './DailyTasks/DailyTask';
import DailyTask1 from './DailyTasks/DailyTask1';
import LastPlayContext from './DailyTasks/LastPlayContext';

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

    @property(Prefab)
    private dailyTaskNodePrefab: Prefab = null!;

    @property(Node)
    private scrollViewContent: Node = null!;

    private betTable = new BetTable(new DefaultBetLimitConfig());
    private betSpriteNodes: Map<Bet, Node> = new Map();

    private dailyTasks: DailyTask[] = [];
    private taskToNode: Map<DailyTask, Node> = new Map();

    start() {
        this.betTable.balance = 10000;
        this.betTable.setChipValue(1);

        this.showNewBalanceValue();
        this.instantiateDailyTasks();
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

        // Игра сыграна, её состояние сохранено в betTable.lastPlayContext.
        // Проходим по всем задачам и обновляем прогресс.
        this.updateProgressOfDailyTasks(this.betTable.lastPlayContext);
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
    // Ежедневные задачи.
    //

    /**
     * Если игрок заходит впервые, то генерируются новые задачи.
     * Если игрок заходит повторно и при этом время жизни прежних задач
     * еще не истекло, создаются определенные экземпляры задач и восстанавливается их состояние из конфига с сервера.
     * Если же время жизни прежних задач уже истекло, то генерируются новые задачи.
     */
    private instantiateDailyTasks() {
        this.dailyTasks.push(new DailyTask1());

        this.dailyTasks.forEach(task => {
            const dailyTaskNode = instantiate(this.dailyTaskNodePrefab);

            this.taskToNode.set(task, dailyTaskNode);

            // Название задачи.
            const nameLabel = dailyTaskNode.getChildByPath('Horizontal Layout/Vertical Layout/Name Node')?.getComponent(Label);
            assert(nameLabel);
            nameLabel.string = task.getName();

            // Полоса прогресса.
            const progressBar = dailyTaskNode.getChildByPath('Horizontal Layout/Vertical Layout/Status Node/ProgressBar')?.getComponent(ProgressBar);
            assert(progressBar);
            progressBar.progress = 0;

            // Числовой прогресс.
            const progressNumberLabel = dailyTaskNode.getChildByPath('Horizontal Layout/Vertical Layout/Status Node/ProgressNumber')?.getComponent(Label);
            assert(progressNumberLabel);
            progressNumberLabel.string = '0/' + task.getTargetNumberAsString();

            // Вознаграждение.
            const rewardSumLabel = dailyTaskNode.getChildByPath('Horizontal Layout2/RewardSum Label')?.getComponent(Label);
            assert(rewardSumLabel);
            rewardSumLabel.string = task.getRewardSumAsString();

            dailyTaskNode.setParent(this.scrollViewContent);
        });
    }

    /**
     * Обновляет прогресс по задачам.
     */
    private updateProgressOfDailyTasks(lastPlayContext: LastPlayContext) {
        for (let task of this.dailyTasks) {
            if (!task.isCompleted) {
                task.updateProgress(lastPlayContext);

                // Обновление UI задачи.
                const taskNode = this.taskToNode.get(task);
                assert(taskNode);

                // Полоса прогресса.
                const progressBar = taskNode.getChildByPath('Horizontal Layout/Vertical Layout/Status Node/ProgressBar')?.getComponent(ProgressBar);
                assert(progressBar);
                progressBar.progress = task.getCurrentNumberScaled();

                // Числовой прогресс.
                const progressNumberLabel = taskNode.getChildByPath('Horizontal Layout/Vertical Layout/Status Node/ProgressNumber')?.getComponent(Label);
                assert(progressNumberLabel);
                progressNumberLabel.string = task.getCurrentNumberAsString() + '/' + task.getTargetNumberAsString();

                // Показать кнопку "Забрать".
                if (task.isCompleted) {
                    const takeRewardButtonNode = taskNode.getChildByPath('Horizontal Layout/TakeRewardButton');
                    assert(takeRewardButtonNode);
                    takeRewardButtonNode.active = true;

                    const takeRewardButton = takeRewardButtonNode.getComponent(Button);
                    assert(takeRewardButton);
                    const rewardSum = task.getRewardSum();

                    // После нажатия кнопки задача остается в массиве, нода UI тоже остается, но скрывается.
                    // Предполагается, что новых задач генерироваться не будет в течение суток, поэтому после выхода из игры
                    // незавершенные задачи, завершенные, но с невостребованным вознаграждением сериализуются на сервер, а
                    // задачи с востребованным вознаграждением просто игнорируются.
                    // При повторном входе, если время для новых заданий не пришло, десериализуются только не выполненные задачи
                    // и задачи с невостребованным вознаграждением.
                    // Так что в худшем случае полностью выполненная и востребованная задача будет в памяти только до завершения текущей игры.
                    // TODO: добавить в задачу флаг, который показывает, что вознаграждение получено, чтобы не сериализовать эту задачу при выгрузке на сервер.
                    takeRewardButton.node.on(Button.EventType.CLICK, (button: Button) => {
                        this.betTable.balance += rewardSum;
                        this.showNewBalanceValue();
                        taskNode.active = false;
                    });
                }
            }
        }
    }
}