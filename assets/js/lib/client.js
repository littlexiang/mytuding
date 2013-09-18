var Client = (function () {
    return {
        _sid: '',
        _uid: '',
        webSocket: null,
        init: function () {
            this.connect();
        },
        connect: function () {
            var url = 'ws://littlexiang.me:8080/';
            this.webSocket = new WebSocket(url, 'echo-protocol');
            this.webSocket.onopen = function () {
                Modules.user.login();
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
                    lang: 'zh-chs'
                },
                sid: this._sid
            };
            postData = JSON.stringify(postData);
            this.webSocket.send(postData);
        },
        reqCallback: function (message) {
            var rsp = JSON.parse(message.data);
            App.log(rsp);
            if (!rsp.rsp) {
                alert(rsp.msg);
                return false;
            } else {
                return Callbacks[rsp.cmd](rsp);
            }
        },
        getSid: function () {
            return this._sid;
        },
        getUid: function () {
            return $this._uid;
        },
        isLogin: function () {
            var sid = localStorage.getItem('sid');
            var uid = localStorage.getItem('uid');
            if (sid && uid) {
                this._sid = sid;
                this._uid = uid;
                return true;
            }
            return false;
        },
        login: function (username, password) {
            this.req('security_login', {
                username: username,
                password: password,
                is_need_get: [0, 0, 0, 0, 0]
            });
        },
        logout: function () {
            localStorage.removeItem('sid');
            localStorage.removeItem('uid');
        },
        timeline: function (since_id) {
            this.req('v2_event_list', {
                type: 'follow',
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
        },
        userDetail: function (uid) {
            uid = uid || this._uid;
            this.req('v2_user_getuser', {
                user_id: uid
            });
        }
    };
})();


