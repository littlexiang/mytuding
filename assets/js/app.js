var Pages = {};

var App = (function () {
    function initPages() {
        Pages.window = $(window);
        Pages.document = $(document);
        Pages.index = $('#page-index');
        Pages.splash = $('#page-splash');
        Pages.menu = $('#menu-left');

        var height = Pages.window.height();
        var width = Pages.window.width();

        App.scrollTo();

        $('#global-wrap').css('width', (width > 626) ? 626 : width)
            .css('min-height', height);
        Pages.splash.css('height', height);
        Pages.menu.css('height', height);
        Pages.index.css('min-height', height);

        Pages.document.on('login-success', function (e) {
            $('#login-form').hide();
            Pages.splash.css('position', 'absolute')
                .animate({left: '100%'}, 750, 'ease', function () {
                    $(this).css({display: 'none', 'position': 'fixed'});
                });
            Pages.index.show();
            Pages.index.trigger('swipeRight');
        });
    }

    function initExts() {
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

    function initIndex() {
        Pages.window.onscroll = function () {
            if (!Pages.index.data('loading')
                && (Pages.index.data('next'))
                && ($(window).scrollTop() > (Pages.index.find('div.photo-detail-wrapper:last').find('dl.photo-author').position().top - 2000))
                ) {
                Pages.index.data('loading', 1);
                Client.timeline(Pages.index.data('since'));
            }
        };
        Pages.index.swipeRight(function () {
            var top = -1 * Pages.window.scrollTop();
            Pages.index.css({position: 'absolute', top: top})
                .animate({left: '80%'}, 300, 'linear');
        });
    }

    function initMenu() {
        Pages.menu.swipeLeft(function () {
            var top = Pages.index.position().top;
            Pages.index.animate({left: '0'}, 300, 'linear', function () {
                Pages.index.css({position: 'relative', top: 0});
                Pages.window[0].scrollTo(0, -1 * top);
            });
        });

        $('#menu-a-index').click(function () {
            Pages.index.prepend(App.render(templates.loading));
            Pages.menu.trigger('swipeLeft');
            Client.timeline();
            App.scrollTo();
        });
    }

    return {
        init: function () {
            initExts();
            initPages();
            initSplash();
            initIndex();
            initMenu();
            Client.init();
        },
        scrollTo: function (el, offset) {
            var top = el ? el.position().top + offset : offset;
            document.body.scrollTop = document.documentElement.scrollTop = top;
        },
        log: function (msg) {
            console.log(msg);
        },
        render: function (tpl, data) {
            return $(Handlebars.compile(tpl)(data));
        }
    };
})();