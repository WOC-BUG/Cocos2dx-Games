// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import script from './ShowGif';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Control extends cc.Component {
    // 稍微休息一下吧
    // 游戏结束...才怪   八嘎，不对啊
    // 好，首先是一胜    哼哼~
    optionNode: cc.Node[] = [];
    voices: cc.AudioClip[] = null;
    voiceClip: cc.AudioClip = null;
    words: string[] = ["鳄鱼~", "爸爸在哪里呀", "抱歉...", "不要被周围迷惑了",
        "变得更强点才有趣吧", "不要说那么过分的话嘛~", "差不多该走了吧", "大概？", "但是，正因如此才很厉害",
        "都是大蠢货=_=", "嗯？辛苦啦=A=", "嗯？怎么了？", "感觉很奇怪", "给",
        "给自己制定规则的人", "哈？你在说什么", "哼哼哼哼，哈哈哈哈XDDD", "还需要一会儿啊...", "还要更往上",
        "好漫长啊...", "接下来的路很坎坷啊", "尽是受支配的一方啊", "昆大人的剧场要开始了XD", "没什么有价值的情报",
        "那么就放心吧", "那太棒了啊", "难道说？", "你的确很弱", "你看，来了",
        "你有听我说话吗？", "情况不坏吧？", "什么嘛", "是个不错的注意吧？", "原来如此！",
        "喂，还没注意到吗？", "我不想谈那件事", "我的名字是昆^_^", "我知道了", "武士道混蛋",
        "有点在意", "怎么会这样？", "这不是什么变化都没有吗？", "如何？", "这就是你一直在找的吗？",
        "走吧", "做好准备吧"];
    tmpWord: string[] = [];
    rightNumber: number = null;

    onLoad() {
        for (let i = 1; i <= 4; i++) {
            let node: cc.Node = cc.find("Canvas/Option/Button" + i);
            this.optionNode.push(node);

            // 每个节点添加触摸事件
            node.on('touchstart', this.touchOption, this);
        }

        //动态加载音频资源        
        let self = this;
        cc.resources.loadDir("audio", cc.AudioClip, function (err, assets: cc.AudioClip[]) {
            if (err) {
                cc.log(err);
                return;
            }
            self.voices = assets;
        });

        // cc.log(this.voices.length);
        this.loadWords();
    }

    start() {

    }

    update(dt) { }

    loadWords() {
        this.tmpWord = this.randomWords(this.words.length);    //生成四个随机词语
        this.rightNumber = this.randomNumber(4);    //4个中随机选一个作为正确答案
        cc.log(this.tmpWord[this.rightNumber]);

        //将四个随机词语填充到节点中
        for (let i = 0; i < 4; i++) {
            let node: cc.Node = this.optionNode[i];
            let word: cc.Label = cc.find("word", node).getComponent(cc.Label);
            word.string = this.tmpWord[i];
        }


        // this.playVoice();   //播放音频
    }

    // 生成一个随机数
    randomNumber(length: number) {
        let num: number = Math.floor(Math.random() * length);
        return num;
    }

    //随机生成四个字符
    randomWords(length: number) {
        let ans: string[] = [];
        let sum: number = 0;
        while (sum < 4) {
            let num: number = Math.floor(Math.random() * length);
            if (ans.indexOf(this.words[num]) == -1) {
                ans.push(this.words[num]);
                sum++;
            }
        }
        return ans;
    }

    // 寻找文字对应音频
    findVoice(rightName: string) {
        let length = this.voices.length;
        // cc.log("length=" + length);
        for (let i = 0; i < 52; i++) {
            let clip: cc.AudioClip = this.voices[i];
            if (clip != null) {
                // cc.log(clip.name);
                if (rightName == clip.name) {
                    return clip;
                }
            }
        }
    }

    // 播放音频
    playVoice() {
        this.voiceClip = this.findVoice(this.tmpWord[this.rightNumber]);    //寻找正确答案对应的音频
        if (this.voiceClip != null)
            cc.audioEngine.play(this.voiceClip, false, 0.5);
    }


    // 判断点击选项是否正确
    touchOption(e: cc.Event.EventTouch) {
        let node: cc.Node = e.currentTarget;   // 当前点击的最上层的目标，即选项面板
        let str: String = node.children[0].getComponent(cc.Label).string;   // OptionNode -> ButtonNode -> Label -> string      
        let resuleDialog: script = cc.find('Canvas/showGif').getComponent("ShowGif");    // 脚本

        // 选对了
        if (this.tmpWord[this.rightNumber] == str) { 
            resuleDialog.show(true);
            cc.log("Accept!");

            // 停顿2s进行下一轮
            let self = this;
            this.scheduleOnce(function () {
                resuleDialog.hide();
                self.loadWords();
            }, 2);
        }
        
        // 选错了
        else {
            resuleDialog.show(false);
            cc.log("Wrong Answer!");

            // 停顿2s图片消失
            let self = this;
            this.scheduleOnce(function () {
                resuleDialog.hide();
            }, 2);
        }
    }
}
