$(function () {
    $.fn.slideOut = function (direction) {
        direction = direction || 'right';
        var option = {};
        option[direction] = '-100%';
        this.css('position', 'absolute').animate(option, 1000, 'ease', function () {
            $(this).remove();
        });
    };
    App.init();
});