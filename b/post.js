var marked = require('marked');
var Backbone = require('backbone');


/* Backbone model for a single post */

var Post = Backbone.Model.extend({

test = "#Hello, World\n     console.log('The World is a dangerous place')";

console.log(marked(test));