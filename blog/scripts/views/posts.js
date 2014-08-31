/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/post',
    'views/post'
], function ($, _, Backbone, PostCollection, PostView) {
    'use strict';

    /*

        This is the main container view for posts. Simply a container for 
        a post collection which renders directly to #posts
    */
    var PostsView = Backbone.View.extend({

        events: {},

        el: $("#posts"),

        initialize: function(){
            this.collection = new PostCollection();
            var that = this;
            this.collection.on("sync", function(collection, res, opts){
                collection.each(function(post){
                    post.get_content();
                });
            });
            this.collection.on("add", function(post){
                that.render();
            });
            this.collection.fetch();
            this.render();
        },

        render: function(){
            this.$el.empty();
            var that = this;
            _(this.collection.models).each(function(item){
                var view = new PostView({model: item});
                view.render();
                that.$el.append(view.el);
            });
            return this;
        }
    });

    return PostsView;
});
