/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'debug',
    'collections/post',
    'views/post',
    'collections/author'
], function ($, _, Backbone, debug, PostCollection, PostView, AuthorCollection) {
    'use strict';

    /*

        This is the main container view for posts. Simply a container for 
        a post collection which renders directly to #posts

        TODO need an acceptable way to render specific Collections instead of all
    */
    var PostsView = Backbone.View.extend({

        events: {},

        el: $('#posts'),

        visiblePosts: [],

        initialize: function(){
            debug('Building PostsView');
            var View = this;
            View.collection = new PostCollection();
            View.authors = new AuthorCollection();
            View.authors.fetch();
            View.collection.on('sync', function(collection, res, opts){
                debug('Got PostCollection');
                View.render();
            });
            View.collection.on('add', function(post){
                debug('PostCollection add');
                View.visiblePosts.push(post.get('id'));
                post.get_content();
            });
            View.collection.fetch();
        },

        render: function(){
            debug('rendering PostsView');
            var View = this;
            View.$el.empty();
            _(View.collection.models).each(function(item){
                if(View.visiblePosts.indexOf(item.get('id'))<0) return;//skip invisible posts
                var post = new PostView({model: item});
                debug('adding post '+item.get('id'));
                View.$el.append( post.render().el );
            });
            return View;
        }
    });

    return PostsView;
});
