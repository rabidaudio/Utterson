/*global define*/

define([
    'underscore',
    'backbone',
    'models/post',
    'backbone-relational'
], function (_, Backbone, PostModel) {
    'use strict';

    var AuthorModel = Backbone.RelationalModel.extend({});

    return AuthorModel;
});
