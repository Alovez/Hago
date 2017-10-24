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
        username: {
            default: null,
            type: cc.EditBox
        },
        email: {
            default: null,
            type: cc.EditBox
        },
        password: {
            default: null,
            type: cc.EditBox
        },
        info: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
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
        console.log(this.netControl.getState());
    },
    
    callback: function (event, customEventData) {
        var username = this.username.string;
        var email = this.email.string;
        var passwd = this.password.String;
        this.netControl.send('regist&' + username + '&' + email + '&' + passwd);
    },
    
    onMessage:function(obj){
        if(obj.data == 'ok'){
            cc.director.loadScene("Login");
        }else{
            this.info.string = obj.data
        }
    },

    onError: function(event){
        console.log(event)
        this.netControl.connect()
    },
    
    onDestroy: function(event){
        onfire.un(this.msssageFire);
        onfire.un(this.errorFire)
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
