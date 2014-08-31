/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marked',
    'templates',
    'views/author'
], function ($, _, Backbone, marked, Templates, AuthorView) {
    'use strict';

    var PostView = Backbone.View.extend({

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change',     this.render);
            this.listenTo(this.model, 'destroy',    this.remove);
            this.listenTo(this.model, 'visible',    this.toggleVisible);
            this.listenTo(this.model, 'got_body',   this.render);
        },

        render: function () {
            console.log("Rendering: "+this.model.get("id"));
            //build html
            this.$el.html(this.template(this.model.toJSON()));
            //compile markdown
            var post_body = this.model.get("content");
            if(!post_body){
                var md = this.model.get("markdown");
                if( !md ){
                    this.$el.hide();
                    return this; //markdown hasn't been fetched yet, so no reason to render
                }
                post_body = this.bodyRender(md);
                this.model.set("content", post_body);
            }
            this.$(".body").html(post_body);
            //add author
            var author = this.model.get("author");
            if(author){
                var authorView = new AuthorView({model: author});
                // authorView.render();
                this.$(".author").replaceWith( authorView.render().el );
            }
            this.$el.show();
            return this;
        },

        bodyRender: marked.parse,

        template: Templates['blog/scripts/templates/post.hbs'],

        remove: function(){
            $el.remove();
        },

        toggleVisible: function(){
            $el.toggle();
        }
    });

    return PostView;
});
