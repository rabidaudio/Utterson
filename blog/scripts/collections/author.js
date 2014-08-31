/*global define*/

define([
    'underscore',
    'backbone',
    'models/author'
], function (_, Backbone, AuthorModel) {
    'use strict';

    var AuthorCollection = Backbone.Collection.extend({
        model: AuthorModel,
        url: '/data/author_store.json'
    });

    return AuthorCollection;
});
