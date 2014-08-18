/*
    Make fancy shell script (probably node) which lets you "publish posts" (add to json index),
    update/reuse authors, etc. then push to github

    Basic usage: fork this repo, add your own posts, and publish to your site (e.g. heroku, divshot)
*/

hljs.initHighlightingOnLoad(); //TODO modularize

marked.setOptions({
  sanitize: false,  //warning

  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }

});

$(document).ready(function ()
{
    var Post = Backbone.Model.extend({
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
            console.log("downloading post body");
            var that = this;
            $.ajax({
                url: this.get("source")
            }).done(function(data, textStatus, jqXHR){
                that.set("markdown", data);
                console.log(that);
                that.trigger("got_body", data);
            });
        }
    });

    var Posts = Backbone.Collection.extend({
        model: Post,
        url: "/posts_store.json"
    });

    var Author = Backbone.Model.extend({

    });

    var Authors = Backbone.Collection.extend({
        model: Author,
        url: "/author_store.json"
    });


    var Routes = Backbone.Router.extend({

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

    var PostView = Backbone.View.extend({

        initialize: function(){
            console.log("postview made");
            this.listenTo(this.model, 'change',     this.render);
            this.listenTo(this.model, 'destroy',    this.remove);
            this.listenTo(this.model, 'visible',    this.toggleVisible);
            this.listenTo(this.model, 'got_body',   this.render);
        },

        bodyRender: marked.parse,

        template: Handlebars.compile( $("#post-template").html() ),

        render: function(){
            //build html
            console.log(this.model);
            this.$el.html(this.template(this.model.toJSON()));
            //compile markdown
            var post_body = this.model.get("content");
            if(!post_body){
                console.log("compiling markdown");
                var md = this.model.get("markdown");
                if( !md ) return;
                post_body = this.bodyRender(md);
                this.model.set("content", post_body);
            }
            console.log(post_body);
            this.$(".body").html(post_body);
            return this;
        },

        remove: function(){
            $el.remove();
        },

        toggleVisible: function(){
            $el.toggle();
        }
    });

    var PostsView = Backbone.View.extend({
        el: $("#posts"),

        initialize: function(){
            this.collection = new Posts();
            var that = this;
            this.collection.on("sync", function(collection, res, opts){
                console.log("sync completed");
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
                console.log("adding item");
                var view = new PostView({model: item});
                view.render();
                that.$el.append(view.el);
            });
            return this;
        }
    });




    //start app
    Backbone.history.start();
    postsView = new PostsView();

});