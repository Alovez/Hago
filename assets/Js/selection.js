cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        avaliable_state: {
            default: null,
            type: cc.SpriteFrame
        },
        choosen_state: {
            default: null,
            type: cc.SpriteFrame
        },
        skill_state: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function () {
        this.set_avaliable();
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function (event) {
            this.set_choosen();
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
            this.set_avaliable();
        }, this);
    },

    set_avaliable: function () {
        this.node.getComponent(cc.Sprite).spriteFrame = this.avaliable_state;
    },

    set_choosen: function () {
        this.node.getComponent(cc.Sprite).spriteFrame = this.choosen_state;
    },

    set_skill: function() {
        this.node.getComponent(cc.Sprite).spriteFrame = this.skill_state;
    },

    set_position: function(x, y) {
        if(x >= 0 & y >= -1 & x <= 5 & y <= 5){
            this.node.setPostitoin((x - 250) / 80, (y - 95) / 80);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
