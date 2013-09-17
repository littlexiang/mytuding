$(function () {
    require.config({
        baseUrl: 'assets/js/module',
        paths: {
        }
    });

    App.init();
    require(['user', 'photo'], function () {
        App.start();
    });
});