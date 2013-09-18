$(function () {
    require.config({
        baseUrl: 'assets/js/module',
        paths: {
        }
    });

    App.init();
    require(['user', 'photo', 'system'], function () {
        App.start();
    });
});