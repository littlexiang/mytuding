Modules.system = {};
Modules.system.about = (function () {

    return function () {
        App.getPage('about', App.render(templates.about)).slideOut('0');
    }
})();
