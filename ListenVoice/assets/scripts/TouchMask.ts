// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchMask extends cc.Component {

    @property(cc.Node)
    controlNode:cc.Node=null;

    @property(cc.Node)
    pauseNode:cc.Node=null;
    onLoad(){
        this.node.on("touchstart",this.touchMask,this);
    }
    start () {

    }

    touchMask(){
        this.node.active=false;
        let pauseMusic:cc.AudioSource=this.pauseNode.getComponent(cc.AudioSource);
        pauseMusic.stop();

        let bg:cc.AudioSource=this.controlNode.getComponent(cc.AudioSource);
        bg.play();
    }
    // update (dt) {}
}
