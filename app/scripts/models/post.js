/*global Blog, Backbone*/

Blog.Models = Blog.Models || {};

(function () {
    'use strict';

    Blog.Models.Post = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
