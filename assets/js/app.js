var Pages = {};

var App = (function () {
    function initPages() {
        Pages.document = $(document);
        Pages.index = $('#page-index');
        Pages.splash = $('#page-splash');
    }

    function initExts() {
        //Zepto
        $.fn.slideOut = function (direction) {
            direction = direction || 'right';
            var option = {};
            option[direction] = '-100%';
            this.css('position', 'absolute').animate(option, 1000, 'ease', function () {
                $(this).remove();
            });
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
        Pages.splash.height($(window).height() * 1.2);
        App.scrollTo();

        $('#login-form').submit(function () {
            var name = $('#login-name').val();
            var pass = $('#login-pass').val();
            Client.login(name, pass);
            return false;
        });

        Pages.document.one('login-success', function (e) {
            $('#login-form').hide();
            Pages.splash.slideOut('right');
            Pages.index.show();
        });
    }

    function initIndex() {
        window.onscroll = function () {
            if (!Pages.index.data('loading')
                && (Pages.index.data('next'))
                && ($(window).scrollTop() > (Pages.index.find('div.photo-detail-wrapper:last').find('dl.photo-author').position().top - 2000))
                ) {
                Pages.index.data('loading', 1);
                Client.timeline(Pages.index.data('since'));
            }
        };
    }

    function initMenu() {
        $('#global-menu-index').click(function () {
            $('#menu').prop('checked', '');
            Pages.index.prepend(App.render(templates.loading));
            App.scrollTo();
            Client.timeline();
        });
    }

    return {
        init: function () {
            initExts();
            initPages();
            initSplash();
            initMenu();
            initIndex();
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
            return $(Handlebars.compile(tpl, data)());
        }
    };
})();