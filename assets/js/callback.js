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
            Pages.index.data('since', rsp.data.since_id)
                .data('next', rsp.data.havenextpage);

            Pages.index.find('.loading').remove();
            rsp.data.list.forEach(function (li) {
                var $li = App.render(templates.photo, li);
                var photo = $li.find('div.photo-wrapper');

                var like = $li.find('a.op-like');
                var likeFunc = function () {
                    if (!like.data('like-status')) {
                        Client.like($li.data('id'));
                        like.find('span.glyphicon').removeClass('glyphicon-heart-empty').addClass('glyphicon-heart').addClass('red');
                        like.find('span.op-like-num').html(parseInt(like.find('span.op-like-num').html()) + 1);
                        like.data('like-status', 'true');
                    }
                };
                like.tap(likeFunc).click(function () {
                    like.trigger('tap');
                });

                var comment = $li.find('a.op-comment');
                var commentFunc = function () {
                    if (!comment.hasClass('on')) {
                        comment.addClass('on');
                        App.render(templates.commentForm).appendTo($li)
                            .on('submit',function () {
                                alert('submit!');
                                return false;
                            }).find('input').tap(function(){
                                $(this).focus();
                            }).tap();
                    }
                };

                $li.find('a.op-comment').tap(commentFunc).click(function () {
                    comment.trigger('tap');
                });
                photo.doubleTap(function (e) {
                    var heart = App.render(templates.likeHeart).appendTo(photo);
                    like.triggerHandler('tap');
                    heart.animate({opacity: 1}, 200, 'ease-in', function () {
                        setTimeout(function () {
                            heart.remove();
                        }, 400);
                    });
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                });
                Pages.index.append($li);
            });

            Pages.index.append(App.render(templates.loading))
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

