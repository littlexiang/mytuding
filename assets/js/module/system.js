Modules.system = {};
Modules.system.about = (function () {
    return function () {
        App.getPage('about').html(App.render(templates.about));
    }
})();
