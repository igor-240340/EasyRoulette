export default abstract class Quest {
    public name: string = "";

    protected numberOfPlays: number = 0;

    constructor(numberOfPlays: number) {
        this.numberOfPlays = numberOfPlays;
    }
}