var Pages = {};

$(function () {
    Pages.index = $("#page-index");
    Pages.splash = $("#page-splash");

    window.onscroll = function () {
        if (!Pages.index.data('loading')
            && (Pages.index.data('next') == 'true')
            && ($(window).scrollTop() > (Pages.index.find('div.photo-detail-wrapper:last').find('dl.photo-author').position().top - 2000))
            ) {
            Pages.index.data('loading', 1);
            Client.timeline(Pages.index.data('since'));
        }
    };

    $.fn.slideOut = function (direction) {
        direction = direction || 'right';
        var option = {};
        option[direction] = '-100%';
        this.css('position', 'absolute').animate(option, 1200, 'ease', function () {
            $(this).remove();
        });
    };

    var now = new Date();
    Handlebars.registerHelper('UTCConvert', function (utc) {
        var date = new Date(utc);
        if (now.getUTCFullYear() == date.getUTCFullYear()) {
            return (date.getUTCMonth() + 1) + "-" + date.getUTCDate()
                + " " + date.getHours() + ":" + date.getMinutes();
        } else {
            return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate()
                + " " + date.getHours() + ":" + date.getMinutes();
        }
    });
    Handlebars.registerHelper('isTrue', function (boolvar, options) {
        if (boolvar === "true" || boolvar === true) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    //page-splash
    Pages.splash.height($(window).height() * 1.2);
    goTop();

    //global menu
    $("#global-menu-index").click(function () {
        $("#menu").prop("checked", "");
        Pages.index.prepend(Handlebars.compile(templates.loading)());
        goTop();
        Client.timeline();
    });

    $(document).one("splash-over", function (e) {
        Pages.splash.slideOut('right');
        Pages.index.show();
    });

});

function showMessage(msg) {
    alert(msg);
}

function goTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function log(msg) {
    console.log(msg);
}