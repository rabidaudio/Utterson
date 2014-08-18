/*
    Make fancy shell script (probably node) which lets you "publish posts" (add to json index),
    update/reuse authors, etc. then push to github

    Basic usage: fork this repo, add your own posts, and publish to your site (e.g. heroku, divshot)
*/

var app = app || {};

hljs.initHighlightingOnLoad(); //TODO modularize

marked.setOptions({
  sanitize: false,  //warning

  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }

});



$(document).ready(function ()
{
    'use strict';

    //start app
    Backbone.history.start();
    var postsView = new app.PostsView(); //fetches posts

});