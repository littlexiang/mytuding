var Pages = {};

var App = (function () {
    function initPages() {
        Pages.window = $(window);
        Pages.document = $(document);
        Pages.body = $('#page-body');
        Pages.index = $('#page-index');
        Pages.splash = $('#page-splash');
        Pages.menu = $('#menu-left');

        Pages.document.on('login-success', function (e) {
            $('#login-form').css('visiblity', 'hidden');
            Pages.splash.slideOut('100%', function () {
                $(this).css({display: 'none'});
            });
        });
    }

    function initExts() {
        $.fn.slideOut = function (left, callback) {
            left = left || '100%';
            callback = callback | function () {
            };
            this.animate({
                translate3d: left + ', 0, 0'
            }, 500, 'ease-in', callback);
        };
        $.fn.scrollTo = function (el, offset) {
            var top = el ? el.position().top + offset : offset;
            this.attr('scrollTop', top);
        };
        //Handlebars
        var now = new Date();
        Handlebars.registerHelper('UTCConvert', function (utc) {
            var date = new Date(utc);
            if (now.getUTCFullYear() == date.getUTCFullYear()) {
                return (date.getUTCMonth() + 1) + '-' + date.getUTCDate()
                    + ' ' + date.getHours() + ':' + date.getMinutes();
            } else {
                return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate()
                    + ' ' + date.getHours() + ':' + date.getMinutes();
            }
        });
        Handlebars.registerHelper('isTrue', function (boolvar, options) {
            if (boolvar === 'true' || boolvar === true) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
    }

    function initSplash() {
        $('#login-form').submit(function () {
            var name = $('#login-name').val();
            var pass = $('#login-pass').val();
            Client.login(name, pass);
            return false;
        });
    }

    function initBody() {
        Pages.body.swipeRight(function () {
            Pages.body.slideOut('80%');
        }).swipeLeft(function () {
                Pages.body.slideOut('0');
            });
    }

    function initMenu() {
        Pages.menu.swipeLeft(function () {
            Pages.body.slideOut('0');
        });

        $('#menu-a-index').click(function () {
            Pages.index.prepend(App.render(templates.loading));
            Pages.menu.trigger('swipeLeft');
            Client.timeline();
            Pages.body.scrollTo();
        });
    }

    return {
        init: function () {
            initExts();
            initPages();
            initSplash();
            initBody();
            initMenu();
            Client.init();
        },
        log: function (msg) {
            console.log(msg);
        },
        render: function (tpl, data) {
            return $(Handlebars.compile(tpl)(data));
        }
    };
})
    ();