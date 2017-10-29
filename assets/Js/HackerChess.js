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
    },

    // use this for initialization
    onLoad: function () {
        this.skill = 1;
        this.x = 0;
        this.y = 0;
        this.node.on(cc.Node.EventType.TOUCH_END, this.callback, this);
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
