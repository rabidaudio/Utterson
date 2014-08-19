/*global define*/

define([
    'underscore',
    'backbone',
    'models/post'
], function (_, Backbone, PostModel) {
    'use strict';

    var PostCollection = Backbone.Collection.extend({
        model: PostModel,
        url: "/data/posts_store.json"
    });

    return PostCollection;
});
