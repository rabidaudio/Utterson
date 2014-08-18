var app = app || {};

(function () {
    'use strict';

    app.Routes = Backbone.Router.extend({

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

      routes: {
        "posts": "posts",
        "posts/:title": "posts"
        //"search/:query/p:page": "search"   // #search/kiwis/p7
      },

      posts: function(title) {
        //show matching posts
      }

    });
    
})();