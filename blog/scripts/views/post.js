/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marked',
    'debug',
    'templates',
    'views/author'
], function ($, _, Backbone, marked, debug, Templates, AuthorView) {
    'use strict';

    var PostView = Backbone.View.extend({

        events: {},

        initialize: function () {
            // this.listenTo(this.model, 'change',     this.render);
            this.listenTo(this.model, 'destroy',    this.remove);
            this.listenTo(this.model, 'visible',    this.toggleVisible);
            this.listenTo(this.model, 'got_body',   this.render);
        },

        render: function () {
            var View = this;
            var id = View.model.get("id");
            
            debug('['+id+']: Rendering PostView');
            //build html
            View.$el.html(View.template(View.model.toJSON()));
            //compile markdown
            var post_body = View.model.get("content");
            if(!post_body){
                debug('['+id+']: Post body not set');
                var md = View.model.get("markdown");
                if( !md ){
                    View.$el.hide();
                    debug('['+id+']: No markdown available');
                    return View; //markdown hasn't been fetched yet, so no reason to render
                }
                debug('['+id+']: Rendering markdown');
                post_body = View.bodyRender(md);
                View.model.set("content", post_body);
            }
            View.$(".body").html(post_body);
            //add author
            var author = View.model.get("author");
            if(author){
                debug('['+id+']: Adding author');
                var authorView = new AuthorView({model: author});
                View.$(".author").replaceWith( authorView.render().el );
            }
            View.$el.show();
            return View;
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
