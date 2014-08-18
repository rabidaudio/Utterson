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
    'backbone'
], function ($, Backbone) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            "posts": "posts",
            "posts/:title": "posts"
            //"search/:query/p:page": "search"   // #search/kiwis/p7
        },

        posts: function(title) {
            //show matching posts
        }

    });

    return RouterRouter;
});
