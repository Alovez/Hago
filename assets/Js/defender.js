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
        back_prefab: {
            default: null,
            type: cc.Prefab
        },
        kill_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_d_prefab: {
            default: null,
            type: cc.Prefab
        },
        left_s_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_d_prefab: {
            default: null,
            type: cc.Prefab
        },
        right_s_prefab: {
            default: null,
            type: cc.Prefab
        },
        stop_prefab: {
            default: null,
            type: cc.Prefab
        },
        chessman_label: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.chessman_dict = {
            'back': '向后',
            'kill': '杀死',
            'left_d': '向左两格',
            'left_s': '向左一格',
            'right_d': '向右两格',
            'right_s': '向右一格',
            'stop': '停止',
            null: '空'
        }
        this.current_type = null
        this.current_text = '空'
        this.data_list = new Array(6)
        for (var i = 0; i < 6; i++){
            this.data_list[i] = new Array(6)
            for (var j = 0; j < 6; j++){
                this.data_list[i][j] = 0
            }
        }
        this.node.on(cc.Node.EventType.MOUSE_UP, function(event){
            var scene = cc.director.getScene();
            var click_x = parseInt((event.getLocationX() - 250) / 80)
            var click_y = parseInt((event.getLocationY() - 95) / 80)
            if (click_x >= 0 & click_y >= 0 & click_x <= 5 & click_y <= 5)
            {
                if (this.data_list[click_x][click_y] == 0){
                    var set_x = click_x * 80 + 290
                    var set_y = click_y * 80 + 135
                    if(this.getCurrentChessman()){
                        var ch = cc.instantiate(this.getCurrentChessman())
                        ch.parent = scene
                        ch.setPosition(set_x, set_y)
                        this.current_type = null
                        this.data_list[click_x][click_y] = this.current_type
                    }
                }
            }
        }, this);
    },

    getCurrentChessman: function(){
        console.log(this.current_type)
        switch(this.current_type){
            case 'back':
                return this.back_prefab
            case 'kill':
                return this.kill_prefab
            case 'left_d':
                return this.left_d_prefab
            case 'left_s':
                return this.left_s_prefab
            case 'right_d':
                return this.right_d_prefab
            case 'right_s':
                return this.right_s_prefab
            case 'stop':
                return this.stop_prefab
            default:
                return null
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.current_text != this.current_type){
            this.current_text = this.current_type
            this.chessman_label.string = this.chessman_dict[this.current_text]
        }
    },
});
