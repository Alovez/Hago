cc.Class({
    extends: cc.Component,

    properties: {
        back_prefab: {
            default: null,
            type: cc.SpriteFrame
        },
        kill_prefab: {
            default: null,
            type: cc.SpriteFrame
        },
        left_d_prefab: {
            default: null,
            type: cc.SpriteFrame
        },
        left_s_prefab: {
            default: null,
            type: cc.SpriteFrame
        },
        right_d_prefab: {
            default: null,
            type: cc.SpriteFrame
        },
        right_s_prefab: {
            default: null,
            type: cc.SpriteFrame
        },
        stop_prefab: {
            default: null,
            type: cc.SpriteFrame
        },
    },

    // use this for initialization
    onLoad: function () {
        this.chess_type = 0;
        this.x = 0;
        this.y = 0;
        this.node.on(cc.Node.EventType.TOUCH_END, this.callback, this);
    },

    set_chess_type: function(chess_type) {
        this.chess_type = chess_type
        console.log('current chess type is: ' + this.chess_type)
        switch(this.chess_type){
            case 1:
                this.node.getComponent(cc.Sprite).spriteFrame = this.back_prefab;
                break;
            case 2:
                this.node.getComponent(cc.Sprite).spriteFrame = this.kill_prefab
                break;
            case 3:
                this.node.getComponent(cc.Sprite).spriteFrame = this.left_d_prefab
                break;
            case 4:
                this.node.getComponent(cc.Sprite).spriteFrame =  this.left_s_prefab
                break;
            case 5:
                this.node.getComponent(cc.Sprite).spriteFrame = this.right_d_prefab
                break;
            case 6:
                this.node.getComponent(cc.Sprite).spriteFrame = this.right_s_prefab
                break;
            case 7:
                this.node.getComponent(cc.Sprite).spriteFrame = this.stop_prefab
                break;
            default:
                return -1
        }
    },

    callback: function(event){
        var chess_click = new cc.Event.EventCustom('chess_click', true)
        chess_click.setUserData([this.x, this.y]);
        this.node.dispatchEvent(chess_click);
    },

    set_pos: function(x, y) {
        this.x = x;
        this.y = y;
        var set_x = x * 80 + 290 - 480;
        var set_y = y * 80 + 135 - 320;
        this.node.setPosition(set_x, set_y);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
