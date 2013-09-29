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

        rsp.data.list.forEach(function (li) {
            var $li = App.render(templates.photo, li);
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
                Modules.photo.getPhoto(li);
            });

            photo.doubleTap(function (e) {
                var heart = App.render(templates.likeHeart).appendTo(photo);
                like.triggerHandler('tap');
                heart.animate({opacity: 1}, 200, 'ease-in',function () {
                    setTimeout(function () {
                        heart.animate({opacity: 0}, 200, 'ease-out');
                    }, 500);
                }).singleTap(function () {
                        Modules.photo.getPhoto(li);
                    });
            });

            $index.append($li);
        });

        $index.data('loading', 0);

        Pages.body.on('scroll', function (e) {
            if (!$index.data('loading')
                && ($index.data('next'))
                && (($index.children('.photo-detail-wrapper').last().position().top - Pages.body.height()) < 1500)
                ) {
                Modules.photo.timeline($index.data('since'));
            }
        });
    };

    return function (since_id) {
        var $index = App.getPage('index');
        if (!$index.data('loading')) {
            if (!since_id) {
                $index.data('reload', 1).prepend(App.render(templates.loading));
            } else {
                $index.append(App.render(templates.loading));
            }
        }
        $index.data('loading', 1);
        Client.timeline(since_id);
    }
})();

Modules.photo.like = (function () {
    Callbacks.place_addgood = function () {
    };
    return function () {
    };
})();

Modules.photo.getPhoto = (function () {

    return function (Photo) {
        App.render(templates.photo, Photo).appendTo(App.getSubPage('photo-' + Photo.id));
    }
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

