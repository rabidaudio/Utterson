/*global define*/

define([
    'underscore',
    'backbone',
    'jquery'
], function (_, Backbone, $) {
    'use strict';

    var PostModel = Backbone.Model.extend({

        // initialize: function() {
        // },

        // defaults: {
        // },

        // validate: function(attrs, options) {
        // },

        // parse: function(response, options)  {
        //     return response;
        // },

    /*
        // Default attributes for the todo
        // and ensure that each todo created has `title` and `completed` keys.
        defaults: {
            title: '',
            completed: false
        },

        // Toggle the `completed` state of this todo item.
        toggle: function () {
            this.save({
                completed: !this.get('completed')
            });

        }
    */

        get_content: function(){
            var that = this;
            $.ajax({
                url: this.get('source')
            }).done(function(data, textStatus, jqXHR){
                that.set('markdown', data);
                that.trigger('got_body', data);
            });
        }
    });

    return PostModel;
});
