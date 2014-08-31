Utterson
========

>A static Markdown-powered blog

Philosophy
----------

With all the power now found on the browser-side, little-to-no logic is required server side anymore.
This is awesome, because it means you can have a sleak, modern web app which can run litterally anywhere
where there is a webserver that can host static files. That means on cheap shared hosting, on a CDN, on
simple hosting services (e.g. http://divshot.io or http://heroku.com), on a Raspberry Pi or other embedded
platform, on a huge enterprise server..... and so on.

There are some basic tools that modern developers are familiar with, and this project rests on them. The
only requirement is Node.js. The platform is built on beginner-level Backbone.js, so it is easy to customize.
Posts are written in Markdown and managed with a script from the terminal, and `git` acts as a sort of CMS.
The pulishing step is quite open, so changes can be deployed via `git` (e.g. to divshot or heroku), via
`ftp` (to most shared hosting sites), or some other crazy way.

**TL; DR**

The goal is to have a blog that looks good and just works using tools you already use,
without a lot of configuration work, which will run anywhere.