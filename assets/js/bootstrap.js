$(function () {
    require.config({
        baseUrl: 'assets/js/module',
        urlArgs: "bust=" + (new Date()).getTime()
    });
    App.init();
    require(['user', 'photo', 'system'], function () {
        App.start();
    });
});