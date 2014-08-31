/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, Template) {
    'use strict';

    var AuthorView = Backbone.View.extend({
        template: Template['blog/scripts/templates/author.hbs'],

        tagName: 'span',

        className: 'author',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return AuthorView;
});
