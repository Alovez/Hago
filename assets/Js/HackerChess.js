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
        movement: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.special = 1;
    },

    get_pos: function() {
        x = this.node.x / 80 + 250;
        y = this.node.y / 80 + 95;
        return [x, y]
    },

    set_pos: function(x, y) {
        set_x = (x -250) / 80;
        set_y = (y - 95) / 80;
        this.node.setPosition(set_x, set_y);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
