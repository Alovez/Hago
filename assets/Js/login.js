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
        passwd: {
            default: null,
            type: cc.EditBox
        },
        info: {
            default: null,
            type: cc.Label
        },
        login_group: {
            default: null,
            type: cc.Sprite
        },
        choose_group: {
            default: null,
            type: cc.Sprite
        },
        reconnect_group: {
            default: null,
            type: cc.Sprite
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
        this.retry_count = 200;
    },
    callback: function (event, customEventData) {
        console.log(customEventData);
        if(customEventData == 'login'){
            var username = this.username.string;
            var passwd = this.passwd.string;
            this.netControl.send('login&' + username + '&' + passwd);
            console.log('send: ' + 'login&' + username + '&' + passwd)
        }else if(customEventData == 'regist'){
            cc.director.loadScene('Regist')
        }else if(customEventData == 'defender'){
            cc.director.loadScene('defender');
        }else if(customEventData == 'hacker'){
            cc.director.loadScene('hacker');
        }
    },
    
    onMessage:function(obj){
        if(obj.data == 'Pass'){
           this.login_group.getComponent(cc.Animation).play('login');
           this.choose_group.getComponent(cc.Animation).play('choose');
        }else{
            console.log(obj.data);
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
