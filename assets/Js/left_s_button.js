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
        num_text: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var node = event.target.getComponent('left_s_button')
            var game_node = node.node.parent.getComponent('defender')
            var c_num = parseInt(node.num_text.string)
            if(game_node.current_type == 0){
                if(c_num > 0){
                    node.num_text.string = c_num - 1
                    game_node.current_type = 4
                    console.log(game_node.current_type)
                }
            }
       });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
