import { _decorator, assert, Component, log, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    // Разное
    private static readonly CELL_COUNT: number = 9

    // Игрок
    private balance: number = 500;

    // Ставки

    private zeroCellIndex: number = 0;

    private betCellIndex: number = 0;   // Индекс ячейки, на которую игрок делает ставку.
    private betSum: number = 0;         // Сумма ставки.

    start() {
        Game.log('Game.start()')

        // this.makeBet(3, 10)

        let randCellIndex = this.getRandomCellIndex();
        let cellFactor = randCellIndex; // Количественно множитель ставки сейчас совпадает с индексом ячейки со ставкой.
        Game.log(`randCellIndex: ${randCellIndex}`)

        // Если выпадает нулевая ячейка, то любая ставка сгорает.
        if (randCellIndex === this.zeroCellIndex) {
            this.balance -= this.betSum;
            Game.log(`Zero cell. You've just lost your bet of ${this.betSum}`)
            Game.log(`New balance: ${this.balance}`)
        }
        // Если выпала ячейка со ставкой - умножаем ставку на множитель ячейки и прибавляем к балансу.
        else if (randCellIndex === this.betCellIndex) {
            this.balance += this.betSum * cellFactor
            Game.log("You're a lucky man!")
            Game.log(`New balance: ${this.balance}`)
        } else {
            Game.log("Bad luck")
        }
    }

    update(deltaTime: number) {
        // Game.log(`cell: ${this.getRandomCellIndex()}`)
    }

    /*
    * Методы, связанные со ставками.
    */
    private makeBet(betSum: number) {
        assert(betSum <= this.balance)

        Game.log("")
    }

    private getRandomCellIndex(): number {
        return Math.floor(Math.random() * Game.CELL_COUNT)
    }

    private static log(message: string) {
        console.log('[Game] ' + message)
    }

    onButtonClick(event: Event, customEventData: string) {
        console.log('onButtonClick')
    }
}
