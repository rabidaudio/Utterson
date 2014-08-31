/*global define*/

define([
    'underscore',
    'backbone',
    'jquery',
    'models/author',
    'backbone-relational'
], function (_, Backbone, $, AuthorModel) {
    'use strict';

    var PostModel = Backbone.RelationalModel.extend({

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

        relations: [{
            type: Backbone.HasOne,
            key: 'author',
            relatedModel: AuthorModel
        }],

        get_content: function(){
            var that = this;
            $.ajax({
                url: this.get('source')
            }).done(function(data, textStatus, jqXHR){
                that.set('markdown', data);
                that.trigger('got_body', data);
            });
        },

        parse: function(data){
            data.date = (new Date(data.date)).toLocaleString(); //convert timestamps to strings
            return data;
        }
    });

    return PostModel;
});
