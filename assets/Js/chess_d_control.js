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
        back_num:{
            default: null,
            type: cc.Label
        },
        kill_num:{
            default: null,
            type: cc.Label
        },
        left_s_num:{
            default: null,
            type: cc.Label
        },
        left_d_num:{
            default: null,
            type: cc.Label
        },
        right_s_num:{
            default: null,
            type: cc.Label
        },
        right_d_num:{
            default: null,
            type: cc.Label
        },
        stop_num:{
            default: null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        this.num_map = {
            1: this.back_num,
            2: this.kill_num,
            3: this.left_d_num,
            4: this.left_s_num,
            5: this.right_d_num,
            6: this.right_s_num,
            7: this.stop_num
        }

    },
    
    callback: function (event, customEventData) {
        //here event is a Touch Event object, you can get events sent to the event node node
        var node = event.target;
        var button = node.getComponent(cc.Button);
        var game_node = node.parent.getComponent('defender')
        var c_num = parseInt(this.num_map[customEventData].string)
        if(game_node.current_type == 0){
            if(c_num > 0){
                this.num_map[customEventData].string = c_num - 1
                game_node.current_type = parseInt(customEventData)
            }
            if(c_num == 0){
                button.interactable = false;
            }
        }
        //here the customEventData parameter is equal to you set before the "foobar"
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
