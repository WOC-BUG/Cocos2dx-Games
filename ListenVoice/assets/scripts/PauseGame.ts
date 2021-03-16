// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class PauseGame extends cc.Component {

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Node)
    controlNode:cc.Node=null;

    onLoad() {
        this.node.on("touchstart", this.changeLable, this);
    }

    start() {

    }

    changeLable() {
        let bg:cc.AudioSource=this.controlNode.getComponent(cc.AudioSource);
        bg.stop();

        let audio:cc.AudioSource=this.getComponent(cc.AudioSource);
        audio.play();
        this.mask.active = true;
    }
    // update (dt) {}
}
