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
        chess: {
            default: null,
            type: cc.Prefab
        },
        chessman_label: {
            default: null,
            type: cc.Label
        },
        next_button: {
            default: null,
            type: cc.Button
        }
    },

    // use this for initialization
    onLoad: function () {
        // this.netControl=require('NetControl');
        // var netConfig=require('NetConfig');
        // this.netControl.connect();
        // this.msssageFire=onfire.on("onmessage",this.onMessage.bind(this));
        // this.errorFire=onfire.on("onerror", this.onError.bind(this));
        // for(var i = 0; i < netConfig.retry; i++){
        //     if (this.netControl.getState() == 1){
        //         break;
        //     }
        //     this.netControl.connect()
        // }
        this.chess_no = 2;
        this.chessman_dict = {
            1: '向后',
            2: '杀死',
            3: '向左两格',
            4: '向左一格',
            5: '向右两格',
            6: '向右一格',
            7: '停止',
            0: '空'
        }
        this.current_type = 0
        this.current_text = '空'
        this.data_list = new Array(36)
        for (var i = 0; i < 36; i++){
            this.data_list[i] = 0;
        }
        this.chess_pool = new cc.NodePool();
        for (let i = 0; i < 14; ++i){
            let chess = cc.instantiate(this.chess);
            this.chess_pool.put(chess);
        }
        this.picked_chess = null;
        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
            if (this.current_type != 0){
                var scene = cc.director.getScene();
                var canvas = this.node;
                var click_x = parseInt((event.getLocationX() - 250) / 80)
                var click_y = parseInt((event.getLocationY() - 95) / 80)
                this.picked_chess = this.chess_pool.get();
                var chess_ctrl = this.picked_chess.getComponent('DefenderChess');
                chess_ctrl.set_chess_type(this.current_type);
                var frame = this.picked_chess.getComponent(cc.Sprite).spriteFrame
                chess_ctrl.set_pos(click_x, click_y);
                this.picked_chess.parent = canvas
                this.picked_chess = null;
                this.current_type = 0;
            }
            
            // if (click_x >= 0 & click_y >= 0 & click_x <= 5 & click_y <= 5)
            // {
            //     if (this.data_list[click_x * 6 + click_y] == 0){
            //         var set_x = click_x * 80 + 290 - 480
            //         var set_y = click_y * 80 + 135 - 320
            //         if(this.getCurrentChessman()){
            //             var ch = cc.instantiate(this.getCurrentChessman())
            //             ch.parent = canvas
            //             ch.setPosition(set_x, set_y)
            //             this.data_list[click_x * 6 + click_y] = this.current_type
            //             this.current_type = 0
            //         }
            //     }
            // }
        }, this);
        this.next_button.node.on('click', this.next_callback, this);
    },

    onMessage:function(obj){
        console.log("It's onMessage----->"+obj.data);
    },

    onError: function(event){
        console.log(event)
        this.netControl.connect()
    },

    next_callback: function(event){
        this.netControl.send(this.chess_no.toString() + '&' + this.data_list.toString());
        console.log("sendToWS: " + this.chess_no.toString() + '&' + this.data_list.toString());
    },

    onDestroy: function(event){
        onfire.un(this.msssageFire);
        onfire.un(this.errorFire)
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.current_text != this.current_type){
            this.current_text = this.current_type
            this.chessman_label.string = this.chessman_dict[this.current_text]
        }
    },
});
