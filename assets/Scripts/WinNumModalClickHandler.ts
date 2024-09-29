import { log, _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WinNumModalClickHandler')
export class WinNumModalClickHandler extends Component {
    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, this.onClick, this);
    }

    onClick() {
        this.node.active = false;
    }
}


