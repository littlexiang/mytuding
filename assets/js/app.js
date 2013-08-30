var Photo = Backbone.Model.extend({

});

var PhotoCollection = Backbone.Collection.extend({
    model: Photo
});

var PhotoView = Backbone.View.extend({
    template: _template($('#template-photo'.html())),
    events: {}

});

