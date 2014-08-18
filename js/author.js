var app = app || {};

(function () {
    'use strict';

    app.Author = Backbone.Model.extend({

    });

    app.Authors = Backbone.Collection.extend({
        model: app.Author,
        url: "/data/author_store.json"
    });
    
})();