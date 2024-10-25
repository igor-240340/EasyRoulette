import { _decorator, Component, Node } from 'cc';
import { ysdk } from 'db://yandex-games-sdk/ysdk';

const { ccclass, property } = _decorator;

@ccclass('RewardButtonHandler')
export class RewardButtonHandler extends Component {
    start() {
    }

    update(deltaTime: number) {
    }

    onButtonClick() {
        console.log('Reward button was clicked!');

        const callbacks = {
            onRewarded: this.onReward.bind(this),
        };

        ysdk.adv.showRewardedVideo({ callbacks });
    }

    onReward() {
        console.log('onReward');
    }
}


