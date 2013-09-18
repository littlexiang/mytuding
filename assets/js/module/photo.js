Modules.photo = {};
Modules.photo.timeline = (function () {
    Callbacks.v2_event_list = function (rsp) {
        var $index = App.getPage('index');
        $index.data('since', rsp.data.since_id)
            .data('next', rsp.data.havenextpage);

        $index.find('.loading').remove();
        var content = App.render(templates.photos, rsp.data);
        content.forEach(function (li) {
            var $li = $(li);
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
            like.tap(likeFunc);

            var comment = $li.find('a.op-comment');
            var commentFunc = function () {
                if (!comment.hasClass('on')) {
                    comment.addClass('on');
                    App.render(templates.commentForm).appendTo($li)
                        .on('submit',function () {
                            alert('submit!');
                            return false;
                        }).find('input').tap(function () {
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
                heart.animate({opacity: 0.8}, 200, 'ease', function () {
                    setTimeout(function () {
                        heart.remove();
                    }, 400);
                });
                e.stopPropagation();
                e.preventDefault();
                return false;
            });
        });
        $index.append(content)
            .append(App.render(templates.loading))
            .data('loading', 0);

        Pages.body.on('scroll', function (e) {
            if (!$index.data('loading')
                && ($index.data('next'))
                && (($index.find('.loading').position().top - Pages.body.height()) < 500)
                ) {
                $index.data('loading', 1);
                Modules.photo.timeline($index.data('since'));
            }
        });
    };

    return function (since_id) {
        if (!since_id) {
            App.getPage('index').html('').prepend(App.render(templates.loading));
        }
        Client.timeline(since_id);
    }
})();

Modules.photo.like = (function () {
    Callbacks.place_addgood = function () {
    };
    return function () {
    };
})();
