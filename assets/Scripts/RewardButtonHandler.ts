import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RewardButtonHandler')
export class RewardButtonHandler extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onButtonClick() {
        console.log('Button was clicked!');
    }
}


