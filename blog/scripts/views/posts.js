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
    */
    var PostsView = Backbone.View.extend({

        events: {
            // 'keypress #new-todo':       'createOnEnter',
            // 'click #clear-completed':   'clearCompleted',
            // 'click #toggle-all':        'toggleAllComplete'
        },

        initialize: function(){
            debug('Building PostsView');
            var View = this;
            

            //TODO switch to this.listenTo pattern:
                //this.listenTo(Todos, 'filter', this.filterAll);
                //this.listenTo(Todos, 'all', this.render);

                
            View.collection.on('sync', function(collection, res, opts){
                debug('Got PostCollection');
                View.render();
            });
            View.collection.on('add', function(post){
                debug('PostCollection add');
                post.get_content();
            });

            if(!View.authors){
                View.authors = new AuthorCollection();
            }
            //grab data
            View.authors.fetch();
            View.collection.fetch();
        },

        render: function(){
            debug('rendering PostsView');
            var View = this;

            View.$el.empty();
            _(View.collection.models).each(function(item){
                var post = new PostView({model: item});
                debug('adding post '+item.get('id'));
                View.$el.append( post.render().el );
            });
            return View;
        }
    });

    return PostsView;
});
