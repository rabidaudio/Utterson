/*global require*/
'use strict';

window.Utterson = window.Utterson || {};
Utterson.DEV = true; //TODO

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        highlightjs: {
            exports: 'hljs'
        },
        'backbone-relational': {
            deps: ['backbone']
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        'backbone-relational': '../bower_components/backbone-relational-amd/backbone-relational',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        marked: '../bower_components/marked/lib/marked',
        highlightjs: '../bower_components/highlightjs/highlight.pack',
        //stupid fucking amd module puts stuff in Handlebars.default which fucks with everything
        // handlebars: '../bower_components/handlebars/handlebars.amd' 
        handlebars: '../bower_components/handlebars/handlebars',
        debug: 'helper/debug'
    }
});

require([
    'backbone',
    'highlightjs',
    'marked',
    'debug',
    'views/posts',
    'collections/post',
    'backbone-relational'
], function (Backbone, hljs, marked, debug, PostsView, PostCollection) {

    /*
    Make fancy shell script (probably node) which lets you "publish posts" (add to json index),
    update/reuse authors, etc. then push to github

    Basic usage: fork this repo, add your own posts, and publish to your site (e.g. heroku, divshot)
*/
    //Configuration
    hljs.initHighlightingOnLoad();

    marked.setOptions({
      sanitize: false,  //warning

      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

    Backbone.history.start();
    debug('App start');

    var postsView = new PostsView({
        collection: new PostCollection(),
        el: $('#posts')
    });
});
