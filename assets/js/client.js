var Client;

$(function () {
    Client = {
        _sid: '',
        _uid: '',
        webSocket: null,
        connect: function () {
            var url = 'ws://littlexiang.me:8080/';
            this.webSocket = new WebSocket(url, 'echo-protocol');
            this.webSocket.onopen = function () {
                if (!Client.isLogin()) {
                    Pages.splash.find('.splash-login').show();
                }
            };

            this.webSocket.onmessage = this.reqCallback;

            this.webSocket.onclose = function () {
                this.connect();
            };
            this.webSocket.onerror = function () {
//                this.connect();
            };
        },
        req: function (cmd, data, files) {
            var postData = {
                cmd: cmd,
                data: data,
                headers: {
                    ua: 'MyTuding/1.0.0',
                    lang: "zh-chs"
                },
                sid: this._sid
            };
            postData = JSON.stringify(postData);
            this.webSocket.send(postData);
        },
        reqCallback: function (message) {
            var rsp = JSON.parse(message.data);
            log(rsp);
            if (!rsp.rsp) {
                alert(rsp.msg);
                return false;
            }else{
                Callbacks[rsp.cmd](rsp);
            }
        },
        isLogin: function () {
            var sid = localStorage.getItem('sid');
            var uid = localStorage.getItem('uid');
            if (sid && uid) {
                this._sid = sid;
                this._uid = uid;
                Client.timeline();
                Pages.document.trigger('splash-over');
                return true;
            }
            return false;
        },
        login: function (username, password) {
            if (!this.isLogin()) {
                this.req('security_login', {
                    username: username,
                    password: password,
                    is_need_get: [0, 0, 0, 0, 0]
                });
            }
        },
        timeline: function (since_id) {
            this.req('v2_event_list', {
                type: "follow",
                since_id: since_id || 0,
                num: 20
            });
        },
        like: function (photo_id) {
            this.req('place_addgood', {
                userid: this._uid,
                placeid: photo_id,
                canreduce: 0
            });
        }
    };
    Client.connect();
});


