var Client;
var Callbacks = {
    security_login: function (rsp) {
        Client._sid = rsp.data.sid;
        Client._uid = rsp.data.USER_ID;
        localStorage.setItem('sid', rsp.data.sid);
        localStorage.setItem('uid', rsp.data.USER_ID);
    },
    v2_event_list: function (rsp) {
        var template = Handlebars.compile(templates.photo);
        var list = $(template(rsp.data));
        list.find("a.op-like").forEach(function (item) {
            if ($(item).data("like-status") == 0) {
                var func = function () {
                    Client.like($(this).data("id"));
                    $(item).find("span.glyphicon").removeClass("glyphicon-heart-empty").addClass("glyphicon-heart").addClass("red");
                    $(item).find("span.op-num").html(parseInt($(item).find("span.op-num").html()) + 1);
                    $(item).data("like-status", "true");
                };
                $(item).tap(func);
//                $(item).click(func);
            }
        });
        var page = $("#page-index");
        if (!page.length) {
            var tpl = Handlebars.compile(templates.pageIndex);
            page = $(tpl()).prependTo("#global-wrap");
            page.data("loading", 0);
            window.onscroll = function () {
                if (!page.data("loading")
                    && (page.data("next") == 'true')
                    && ($(window).scrollTop() > (page.find("div.photo-detail-wrapper:last").find("dl.photo-author").position().top - 1000))
                    ) {
                    page.data("loading", 1);
//                    Client.timeline(page.data("since"));
                }
//                log(page.find("div.photo-detail-wrapper:last").find("dl.photo-author").position().top - 1000);
//                log($(window).scrollTop());
            };
        }
        page.data("since", rsp.data.since_id)
            .data("next", rsp.data.havenextpage)
            .prepend(list)
            .data("loading", 0);

    },
    place_good: function (rsp) {
    }
};

$(function () {
    Handlebars.registerHelper('UTCConvert', function (utc) {
        var date = new Date(utc);
        return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate()
            + " " + date.getHours() + ":" + date.getMinutes();
    });
    Handlebars.registerHelper('isTrue', function (boolvar, options) {
        if (boolvar === "true" || boolvar === true) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
});

$(function () {
    var w;
    var url = 'ws://192.168.157.70:8080/';

    w = new WebSocket(url, 'echo-protocol');

    w.onopen = function () {
        log('connected, init......');
    }

    w.onmessage = function (e) {
        var rsp = JSON.parse(e.data);
        log(rsp);
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
        _uid: '',
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
            var uid = localStorage.getItem('uid');
            if (sid && uid) {
                this._sid = sid;
                this._uid = uid;
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
        },
        like: function (photo_id) {
            this.req('place_addgood', {
                userid: this._uid,
                placeid: photo_id,
                canreduce: 1
            });
        }
    };

    //test
    setTimeout(function () {
        log(Client.webSocket.readyState);
        Client.login('littlexiang521@gmail.com', '3223900');
    }, 500);

    setTimeout(function () {
        Client.timeline();
    }, 1000);

});

function showMessage(msg) {
    alert(msg);
}

function log(msg) {
    console.log(msg);
}


