Modules.photo = {};
Modules.photo.timeline = (function () {
    Callbacks.v2_event_list = function (rsp) {
        var $index = App.getPage('index');
        if ($index.data('reload')) {
            $index.html('');
            $index.data('reload', 0);
        }
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
                    like.find('span.num').html(parseInt(like.find('span.num').html()) + 1);
                    like.data('like-status', 'true');
                }
            };
            like.tap(likeFunc);

            $li.find('a.op-comment').tap(function () {
                Modules.photo.commentForm($li.data('id'), this);
            });

            photo.doubleTap(function (e) {
                var heart = App.render(templates.likeHeart).appendTo(photo);
                like.triggerHandler('tap');
                heart.animate({opacity: 1}, 200, 'ease-in', function () {
                    setTimeout(function () {
                        heart.remove();
                    }, 500);
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
                && (($index.find('.loading').position().top - Pages.body.height()) < 1000)
                ) {
                $index.data('loading', 1);
                Modules.photo.timeline($index.data('since'));
            }
        });
    };

    return function (since_id) {
        var $index = App.showPage('index');
        if (!since_id) {
            $index.data('reload', 1).prepend(App.render(templates.loading));
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

Modules.photo.commentForm = (function () {
    return function (photo_id, comment_btn) {
        var $div = App.getPage('popup');
        //0px -> 0px cannot trigger callback ...
        $div.slideDown('1px', function () {
            $div.html('');
            var $form = App.render(templates.commentForm).appendTo($div);
            var $input = $form.find('input[name="content"]');
            $form.one('submit', function (e) {
                $input.blur();
                $div.slideDown('0px');
                var content = $input.val();
                if (content) {
                    Modules.photo.comment(photo_id, content, comment_btn);
                }
                e.preventDefault();
                return false;
            });
            $form.one('reset', function () {
                $div.slideDown('0px', function () {
                    $form.remove();
                });
            });
            $div.slideDown('-100%', function () {
                $input.focus();
            });
        });
    }
})();

Modules.photo.comment = (function () {

    return function (photo_id, content, comment_btn) {
        Callbacks.v2_place_comment = function () {
            $(comment_btn).find('span.num').html(parseInt($(comment_btn).find('span.num').html()) + 1);
        };

        Client.comment(photo_id, content);
    }
})();

