// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShowGif extends cc.Component {

    // AC图集
    @property(cc.SpriteAtlas)
    atlasAC: cc.SpriteAtlas = null;
    spriteAC: cc.SpriteFrame[] = [];

    // AC 音频
    @property(cc.AudioClip)
    audioAC: cc.AudioClip = null;

    // WA图集
    @property(cc.SpriteAtlas)
    atlasWA: cc.SpriteAtlas = null;
    spriteWA: cc.SpriteFrame[] = [];

    // WA 音频
    @property(cc.AudioClip)
    audioWA: cc.AudioClip = null;

    // 当前显示的图片
    nodeAC: cc.Node = null;
    nodeWA: cc.Node = null;
    nowAC: cc.Sprite = null;
    nowWA: cc.Sprite = null;
    index: number = 0;

    onLoad() {
        // 获取孩子节点，及其其精灵组件
        this.nodeAC = this.node.children[0];
        this.nodeWA = this.node.children[1];
        this.nowAC = this.nodeAC.getComponent(cc.Sprite);
        this.nowWA = this.nodeWA.getComponent(cc.Sprite);

        if (this.atlasAC != null)
            this.spriteAC = this.atlasAC.getSpriteFrames();

        if (this.atlasWA != null)
            this.spriteWA = this.atlasWA.getSpriteFrames();
    }

    start() {

    }

    show(flag: boolean) {
        if (flag) {
            this.nodeAC.active = true;
            // 播放音频
            if (this.audioAC != null)
                cc.audioEngine.play(this.audioAC, false, 1);

            // 播放图集
            this.schedule(this.playAC, 0.1);
        }
        else {
            this.nodeWA.active = true;
            // 播放音频
            if (this.audioWA != null)
                cc.audioEngine.play(this.audioWA, false, 1);

            // 播放图集
            this.schedule(this.playWA, 0.1);
        }
    }

    // AC动画
    playAC() {
        if (this.spriteAC.length == 0) {
            return;
        }
        if (this.index >= this.spriteAC.length - 1) {
            this.index = 0;
            return;
        }
        this.nowAC.spriteFrame = this.spriteAC[this.index];
        this.index++;
    }

    // WA动画
    playWA() {
        if (this.spriteWA.length == 0) {
            return;
        }
        if (this.index >= this.spriteWA.length - 1) {
            this.index = 0;
            return;
        }
        this.nowWA.spriteFrame = this.spriteWA[this.index];
        this.index++;
    }

    hide() {
        this.nodeAC.active = false;
        this.nodeWA.active = false;
    }
}
