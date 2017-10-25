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
        }

    },

    // use this for initialization
    onLoad: function () {
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
