var app = app || {};

(function ($, Handlebars, marked) {
    'use strict';

    app.Post = Backbone.Model.extend({
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
                url: this.get("source")
            }).done(function(data, textStatus, jqXHR){
                that.set("markdown", data);
                that.trigger("got_body", data);
            });
        }
    });

    app.Posts = Backbone.Collection.extend({
        model: app.Post,
        url: "/data/posts_store.json"
    });



    app.PostView = Backbone.View.extend({

        initialize: function(){
            this.listenTo(this.model, 'change',     this.render);
            this.listenTo(this.model, 'destroy',    this.remove);
            this.listenTo(this.model, 'visible',    this.toggleVisible);
            this.listenTo(this.model, 'got_body',   this.render);
        },

        bodyRender: marked.parse,

        template: Handlebars.compile( $("#post-template").html() ),

        render: function(){
            //build html
            this.$el.html(this.template(this.model.toJSON()));
            //compile markdown
            var post_body = this.model.get("content");
            if(!post_body){
                var md = this.model.get("markdown");
                if( !md ) return;
                post_body = this.bodyRender(md);
                this.model.set("content", post_body);
            }
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


    app.PostsView = Backbone.View.extend({
        el: $("#posts"),

        initialize: function(){
            this.collection = new app.Posts();
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
                var view = new app.PostView({model: item});
                view.render();
                that.$el.append(view.el);
            });
            return this;
        }
    });

    
})(jQuery, Handlebars, marked);