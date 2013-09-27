Modules.user = {};
Modules.user.login = (function () {
    var $form = $('#login-form');
    Callbacks.security_login = function (rsp) {
        Client._sid = rsp.data.sid;
        Client._uid = rsp.data.USER_ID;
        localStorage.setItem('sid', rsp.data.sid);
        localStorage.setItem('uid', rsp.data.USER_ID);
        localStorage.setItem('name', rsp.data.DISPLAY_NAME);
        localStorage.setItem('avatar', rsp.data.THUMBNAIL_URL);
        Pages.document.trigger('login-success');
    };

    Pages.document.on('login-success', function (e) {
//        Modules.photo.timeline();
        Modules.user.home();
        $form.hide();
        Pages.splash.slideOut('100%', function () {
            $(this).hide();
        });
        Pages.menu.find('.avatar').attr('src', localStorage.getItem('avatar'));
        Pages.menu.find('.name').html(localStorage.getItem('name'));
        Pages.menu.css({display: 'block'});
        Pages.body.trigger('swipeRight');
    });

    $form.submit(function () {
        var name = $form.find('#login-name').val();
        var pass = $form.find('#login-pass').val();
        Client.login(name, pass);
        return false;
    });

    return function () {
        if (Client.isLogin()) {
            Pages.document.trigger('login-success');
        } else {
            Pages.splash.show().find('#login-form').show();
        }
    }
})();

Modules.user.logout = (function () {
    return function () {
        Client.logout();
        Pages.splash.show().slideOut('0').find('#login-form').show();
    }
})();

Modules.user.home = (function () {
    Callbacks.v2_user_getuser = function (rsp) {
        var $home = App.getPage('home');
        $home.children('.user-home-body').remove();
        App.render(templates.home, rsp.data).prependTo($home);
        Client.userPhotos();
    };
    Callbacks.v2_user_photos = function (rsp) {
        var $home = App.getPage('home');
        $home.children('.user-home-photos').remove();
        var $thumbs = App.render(templates.thumbs, rsp.data.photos);
        $home.append($thumbs);
        $home.data('next', rsp.data.photos.havenextpage)
            .data('since', rsp.data.photos.since_id);
    };

    return function () {
        App.getPage('home');
        Client.userDetail();
    }
})();