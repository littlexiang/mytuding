var Callbacks = (function () {
    return {
        security_login: function (rsp) {
            Client._sid = rsp.data.sid;
            Client._uid = rsp.data.USER_ID;
            localStorage.setItem('sid', rsp.data.sid);
            localStorage.setItem('uid', rsp.data.USER_ID);
            Client.timeline();
            Pages.document.trigger('login-success');
        },
        v2_event_list: function (rsp) {
            var list = App.render(templates.photos, rsp.data);
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
                like.click(function(){
                    like.trigger('tap');
                });
                photo.doubleTap(function (e) {
                    var heart = App.render(templates.likeHeart).appendTo(photo);
                    like.triggerHandler('tap');
                    heart.fadeIn('fast', function(){
                        setTimeout(function () {
                            heart.remove();
                        }, 750);
                    });
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                });
            });

            Pages.index.find('.loading').remove();
            Pages.index.data('since', rsp.data.since_id)
                .data('next', rsp.data.havenextpage)
                .append(list)
                .append(App.render(templates.loading))
                .data('loading', 0);

            Pages.body.on('scroll', function (e) {
                if (!Pages.index.data('loading')
                    && (Pages.index.data('next'))
                    && ((Pages.index.find('.loading').position().top - Pages.body.height()) < 500)
                    ) {
                    Pages.index.data('loading', 1);
                    Client.timeline(Pages.index.data('since'));
                }
            });
        },
        place_addgood: function (rsp) {
        }

    };
})();

