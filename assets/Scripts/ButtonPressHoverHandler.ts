import { _decorator, Component, Button, log, Node, Touch, SpriteFrame, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonPressHoverHandler')
export class ButtonPressHoverHandler extends Component {
    @property(Button)
    button: Button | null = null;

    @property([Button])
    relatedButtons: Button[] = [];

    @property([SpriteFrame])
    normalSprites: SpriteFrame[] = [];

    @property([SpriteFrame])
    hoverSprites: SpriteFrame[] = [];

    onLoad () {
        this.button.node.on(Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.button.node.on(Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);

        this.button.node.on(Input.EventType.TOUCH_START, this.onMouseEnter, this);
        this.button.node.on(Input.EventType.TOUCH_END, this.onMouseLeave, this);
    }

    onMouseEnter (button: Button) {
        log("ENTER")

        for (let i = 0; i < this.relatedButtons.length; i++) {
            this.relatedButtons[i].normalSprite = this.hoverSprites[i];
        }
    }

    onMouseLeave (button: Button) {
        log("LEAVE")

        for (let i = 0; i < this.relatedButtons.length; i++) {
            this.relatedButtons[i].normalSprite = this.normalSprites[i];
        }
    }
}
