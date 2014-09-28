/*global define*/

        /*
            content
                /posts/x.md

            urls
                posts
                    /#!/posts
                    /#!/posts/title
                    /#!/posts/title#s2
                    /#!/posts/latest
                    ?
                        before=
                        after=
                users
                    /#!/users
                    /#!/users/name
                    /#!/
        */

define([
    'jquery',
    'backbone',
    'views/posts',
    'collections/post'
], function ($, Backbone, PostsView, PostCollection) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            'posts': 'posts',
            'posts/:id': 'posts'
            //"search/:query/:page": "search"   // #search/kiwis/7
        },

        posts: function(id) {
            //show matching posts
            if(id == null){
                //set collection to all
                Utterson.all_posts = new PostCollection();
                var postsView = new PostsView({
                    collection: Utterson.all_posts,
                    el: $('#posts')
                });
            }else{
                if(!Utterson.all_posts) Utterson.all_posts = new PostCollection(); //initalize
                var collection = new PostCollection( Utterson.all_posts.find({id: id}) );//limit to desired post
                var postsView = new PostsView({
                    collection: collection,
                    el: $('#posts')
                });
            }
        }

    });

    return RouterRouter;
});
