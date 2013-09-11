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
            var like = $(li).find('a.op-like');
            var photo = $(li).find('div.photo-wrapper');
            var func = function () {
                var $this = $(this);
                if (!$this.data('like-status')) {
                    Client.like($this.data('id'));
                    $this.find('span.glyphicon').removeClass('glyphicon-heart-empty').addClass('glyphicon-heart').addClass('red');
                    $this.find('span.op-num').html(parseInt($this.find('span.op-num').html()) + 1);
                    $this.data('like-status', 'true');
                }
            };
            like.tap(func);
            photo.doubleTap(function (e) {
                var heart = $(this).find('div.photo-like-heart');
                heart.show().fadeIn('fast');
                like.triggerHandler('tap');
                setTimeout(function () {
                    heart.fadeOut('fast').hide();
                }, 750);
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

