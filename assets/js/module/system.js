Modules.system = {};
Modules.system.about = (function () {
    return function () {
        App.getPage('about', App.render(templates.about));
        App.showPage('about');
    }
})();
