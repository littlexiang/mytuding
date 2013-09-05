var Client;
var Callbacks = {
    security_login: function (rsp) {
        Client._sid = rsp.data.sid;
        localStorage.setItem('sid', rsp.data.sid);
//        alert("login as " + rsp.data.DISPLAY_NAME);
    },
    v2_event_list: function (rsp) {
        var template = Handlebars.compile(templates.photo);
        $('#page-index').append(template(rsp.data));
    }
};

$(function () {
    Handlebars.registerHelper('UTCConvert', function (utc) {
        var date = new Date(utc);
        return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate()
            + " " + date.getHours() + ":" + date.getMinutes();
    });
});

$(function () {
    var w;
    var url = 'ws://192.168.157.70:8080/';

    w = new WebSocket(url, 'echo-protocol');

    w.onopen = function () {
        console.log('connected, init......');
    }

    w.onmessage = function (e) {
        var rsp = JSON.parse(e.data);
        console.log(rsp);
        if (!rsp.rsp) {
            alert(rsp.msg);
            return false;
        }
        Callbacks[rsp.cmd](rsp);
    };

    w.onclose = function () {
        showMessage('连接关闭，请刷新页面重试。', 'error', 0);
    }

    w.onerror = function () {
        showMessage('连接错误～', 'error', 0);
    }

    Client = {
        _sid: '',
        webSocket: w,
        req: function (cmd, data, files) {
            var postData = {
                cmd: cmd,
                data: data,
                headers: {
                    ua: "MyTuding/1.0.0",
                    lang: "zh-chs"
                },
                sid: this._sid
            };
            postData = JSON.stringify(postData);
            this.webSocket.send(postData);
        },
        login: function (username, password) {
            var sid = localStorage.getItem('sid');
            if (sid) {
                this._sid = sid;
            } else {
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
        }
    };

    //test
    setTimeout(function () {
        console.log(Client.webSocket.readyState);
        Client.login('littlexiang521@gmail.com', '3223900');
    }, 500);

    setTimeout(function () {
        Client.timeline();
    }, 1000);

});


