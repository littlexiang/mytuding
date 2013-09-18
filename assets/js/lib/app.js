var Pages = {};
var Callbacks = {};
var Modules = {};

var App = (function () {
    function initPages() {
        Pages.window = $(window);
        Pages.document = $(document);
        Pages.body = $('#page-body');
        Pages.splash = $('#page-splash');
        Pages.menu = $('#menu-left');

        var h = Pages.document.height();
        Pages.body.height(h);
        Pages.splash.height(h);
        Pages.menu.height(h);
    }

    function initExts() {
        $.fn.slideOut = function (left, callback) {
            left = left || '100%';
            this.animate({
                translate3d: left + ', 0, 0'
            }, 500, 'ease-in', callback);
            return this;
        };
        $.fn.scrollToEl = function (el, offset) {
            offset = offset || 0;
            var top = el ? (el.position().top + offset) : offset;
            this[0].scrollTo(0, top);
            return this;
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

    function initBody() {
        Pages.window[0].scrollTo(0, 1);
        Pages.window[0].onscroll = function () {
            return false;
        };
        Pages.body.swipeRight(function () {
            Pages.body.slideOut('80%');
        }).swipeLeft(function () {
                Pages.body.slideOut('0%');
            });
    }

    function initMenu() {
        Pages.menu.swipeLeft(function () {
            Pages.body.trigger('swipeLeft');
        });
        $('#menu-index').click(function () {
            Modules.photo.timeline();
        });

        $('#menu-logout').click(function () {
            Modules.user.logout();
        });

        $('#menu-about').click(function () {
            Modules.system.about();
        });

        $('#menu-home').click(function () {
            Modules.user.home();
        });

        Pages.menu.find('ul a').click(function () {
            Pages.body.trigger('swipeLeft');
            Pages.body[0].scrollTop = 0;
        });

    }

    return {
        init: function () {
            initExts();
            initPages();
            initBody();
            initMenu();
        },
        start: function () {
            Client.init();
        },
        log: function (msg) {
            console.log(msg);
        },
        render: function (tpl, data) {
            return $(Handlebars.compile(tpl)(data));
        },
        getPage: function (name, content) {
            Pages.body.children('div').hide();
            if (!Pages[name]) {
                Pages[name] = $('<div id="page-' + name + '"></div>').append(content).appendTo(Pages.body);
            }
            return Pages[name].show();
        }
    };
})();