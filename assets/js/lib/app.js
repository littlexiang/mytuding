var Pages = {};
var Callbacks = {};
var Modules = {};

var App = (function () {
    function initPages() {
        Pages.window = $(window);
        Pages.document = $(document);
        Pages.popup = $('#popup');
        Pages.body = $('#page-body');
        Pages.splash = $('#page-splash');
        Pages.menu = $('#menu-left');

        var h = Pages.window.height();
        $('body').height(h);
        Pages.body.height(h);
        Pages.splash.height(h);
        Pages.menu.height(h);
    }

    function initExts() {
        $.fn.slideOut = function (x, callback) {
            x = x || '100%';
            this.animate({
                translate3d: x + ', 0, 0'
            }, 350, 'ease-in', callback);
            return this;
        };
        $.fn.slideDown = function (z, callback) {
            z = z || '100%';
            this.animate({
                translate3d: '0, ' + z + ', 0'
            }, 150, 'ease-in', callback);
            return this;
        };
        $.fn.smoothScroll = function (el, offset, duration) {
            offset = offset || 0;
            var difference = el ? (el.position().top + offset) : offset;
            var perTick = difference / duration * 10;
            this.scrollToTimerCache = setTimeout(function () {
                if (!isNaN(parseInt(perTick, 10))) {
                    this[0].scrollTop = this.scrollTop() + perTick;
                    this.smoothScroll(el, offset, duration - 10);
                }
            }.bind(this), 10);

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
        Handlebars.registerHelper('getThumb', function (url, size) {
            return url.replace(/_thumb_[^\.]+/i, (size ? ('_thumb_' + size) : ''));
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
        log: function () {
            var args = Array.prototype.slice.call(arguments);
            args.forEach(function (val) {
                console.log(val);
            })
        },
        render: function (tpl, data) {
            return $(Handlebars.compile(tpl)(data));
        },
        getPage: function (name, content, prepend) {
            if (!Pages[name]) {
                Pages[name] = $('<div id="page-' + name + '"></div>').appendTo(Pages.body);
            }
            if (content) {
                if (prepend) {
                    Pages[name].prepend(content);
                } else {
                    Pages[name].append(content);
                }
            }
            Pages.body.off('scroll');
            return Pages[name];
        },
        showPage: function (name) {
            var page = this.getPage(name);
            page.show().siblings().hide();
            return page;
        }
    };
})();