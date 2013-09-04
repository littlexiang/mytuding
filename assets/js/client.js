var url = 'ws://192.168.157.70:8080/';
var w;
var mtClient;
$().ready(function () {
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
        switch (rsp.cmd) {
            case 'security_login':
                mtClient._sid = rsp.data.sid;
                alert(rsp.data.DISPLAY_NAME);
                break;
        }
    }

    w.onclose = function () {
        showMessage('连接关闭，请刷新页面重试。', 'error', 0);
    }

    w.onerror = function () {
        showMessage('连接错误～', 'error', 0);
    }

    mtClient = {
        _sid: '',
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
            w.send(JSON.stringify(postData));
        },
        login: function (username, password) {
            this.req('security_login', {
                username: username,
                password: password,
                is_need_get: [0, 0, 0, 0, 0]
            });
        }
    };
});

function showMessage(msg, type, timeout) {
    alert(msg);
}