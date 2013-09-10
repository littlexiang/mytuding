var Callbacks = {};

$(function () {
    Callbacks.security_login = function (rsp) {
        Client._sid = rsp.data.sid;
        Client._uid = rsp.data.USER_ID;
        localStorage.setItem('sid', rsp.data.sid);
        localStorage.setItem('uid', rsp.data.USER_ID);
        Client.timeline();
    };

    Callbacks.v2_event_list = function (rsp) {
        var template = Handlebars.compile(templates.photo);
        var list = $(template(rsp.data));
        list.forEach(function (li) {
            var a_like = $(li).find('a.op-like');
            var photo = $(li).find('div.photo-wrapper').first();
            var heart = photo.find('div.photo-like-heart');
            if (!a_like.data('like-status')) {
                var func = function () {
                    Client.like(a_like.data('id'));
                    a_like.find('span.glyphicon').removeClass('glyphicon-heart-empty').addClass('glyphicon-heart').addClass('red');
                    a_like.find('span.op-num').html(parseInt(a_like.find('span.op-num').html()) + 1);
                    a_like.data('like-status', 'true');
                };
                a_like.tap(func);
            }
            photo.doubleTap(function (e) {
                heart.fadeIn('fast');
                setTimeout(function () {
                    heart.fadeOut('fast');
                }, 750);
                a_like.triggerHandler('tap');
                e.stopPropagation();
                e.preventDefault();
                return false;
            });
        });

        Pages.index.find('.loading').remove();
        Pages.index.data('since', rsp.data.since_id)
            .data('next', rsp.data.havenextpage)
            .data('loading', 0)
            .append(list)
            .append(Handlebars.compile(templates.loading)());
        Pages.index.data('loading', 0);
    };

    Callbacks.place_addgood = function (rsp) {
    };
});

