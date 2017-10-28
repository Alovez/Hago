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
        this.x = 0;
        this.y = 0;
        this.node.on('click', this.callback, this);
    },

    callback: function(event){
        var movement_event = new cc.Event.EventCustom('movement_click', true)
        movement_event.setUserData([this.x, this.y]);
        this.node.dispatchEvent(movement_event);
    },

    set_pos: function(x, y){
        this.x = x;
        this.y = y;
        this.node.setPosition(x * 80 + 290 - 480, y * 80 + 135 - 320);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
