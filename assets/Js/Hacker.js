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
        },
        chess: {
            default: null,
            type: cc.Prefab
        },
        chess_num_text: {
            default: null,
            type: cc.Label
        },
        chess_num: 0
    },

    // use this for initialization
    onLoad: function () {
        this.special = 1;
        this.first_round = true;
        this.round_step = 3;
        this.movement_pool = new cc.NodePool();
        let initCount = 8;
        for (let i = 0; i < initCount; ++i) {
            let movement = cc.instantiate(this.movement); // 创建节点
            this.movement_pool.put(movement); // 通过 putInPool 接口放入对象池
        }
        this.chess_pool = new cc.NodePool();
        for (let i = 0; i < this.chess_num; ++i){
            let chess = cc.instantiate(this.chess);
            this.chess_pool.put(chess);
        }
        this.picked_chess = null;
        this.retry_count = 200;
        this.netControl=require('NetControl');
        var netConfig=require('NetConfig');
        this.netControl.connect();
        this.msssageFire=onfire.on("onmessage",this.onMessage.bind(this));
        this.errorFire=onfire.on("onerror", this.onError.bind(this));
        for(var i = 0; i < netConfig.retry; i++){
            if (this.netControl.getState() == 1){
                break;
            }
            this.netControl.connect()
        }
        this.first_init();
        this.chess_num_text.string = this.chess_num;
        this.node.on('movement_click', this.movement_click, this);
        this.node.on('chess_click', this.chess_click, this);
        console.log(this.node.getChildByName('movement'));
    },

    next_callback: function(event, CustomerEventData){
        this.first_round = false;
        this.round_step = 3;
    },

    movement_click: function(event){
        var pos = event.getUserData();
        this.round_step--;
        if (this.picked_chess){
            this.picked_chess.getComponent('HackerChess').set_pos(pos[0], pos[1]);
            this.picked_chess = null;
        }else{
            this.chess_num--;
            this.chess_num_text.string = this.chess_num;
            this.add_chess(pos[0], pos[1])
        }
        if (this.first_round & this.chess_num > 3){
            this.remove_movement(event.target);
        }else{
            this.remove_all_movement();
        }
    },

    chess_click: function(event){
        if (this.round_step > 0 & this.first_round == false){
            this.picked_chess = event.target;
            var pos = event.getUserData();
            for(let dx = -1; dx < 2; dx++){
                for (let dy = 0; dy < 2; dy++){
                    var x = pos[0] + dx;
                    var y = pos[1] + dy;
                    if (x >= 0 & x < 6){
                        if (x == pos[0] & y == pos[1]){
                            console.log('chess_pos');
                        }else{
                            this.add_movement(x, y);
                        }
                    }
                }
            }
        }
    },

    add_chess: function(x, y){
        let chess = null;
        if (this.chess_pool.size() > 0) {
            chess = this.chess_pool.get();
            chess.parent = this.node;
            chess.getComponent('HackerChess').set_pos(x, y);
        }
    },

    add_movement: function(x, y){
        let movement = null;
        if (this.movement_pool.size() > 0) {
            movement = this.movement_pool.get();
        } else {
            movement = cc.instantiate(this.movement);
        }
        movement.parent = this.node;
        movement.getComponent('movement').set_pos(x, y);
    },

    remove_movement: function(movement){
        this.movement_pool.put(movement);
    },

    remove_all_movement: function(){
        while(this.node.getChildByName('movement')){
            this.movement_pool.put(this.node.getChildByName('movement'));
        }
    },

    first_init: function(){
        for(var x = 0; x < 6; x++){
            this.add_movement(x, -1);
        }
    },
    
    covert__to_index: function(x, y){
        var r_x = parseInt((x - 250) / 80);
        var r_y = parseInt((y - 90) / 80);
        return [r_x, r_y];
    },

    covert_to_pos: function(x, y){
        var r_x = x * 80 + 290 - 480
        var r_y = y * 80 + 135 - 320
        return [r_x, r_y];
    },

    onMessage:function(obj){
        console.log("It's onMessage----->"+obj.data);
    },

    onError: function(event){
        console.log(event)
        this.netControl.connect()
    }, 

    onDestroy: function(event){
        onfire.un(this.msssageFire);
        onfire.un(this.errorFire)
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.retry_count == 0){
            this.netControl.connect()
            this.retry_count = 200;
        }else{
            this.retry_count--;
        }
    },
});
