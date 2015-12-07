# meteor.netsi.io
Test meteor app - sandbox

## Deploy to Heroku
[http://justmeteor.com/blog/deploy-to-production-on-heroku/](http://justmeteor.com/blog/deploy-to-production-on-heroku/)


## I did this:

1.  `heroku create meteor-netsi-io` to create a new heroku app
```
Creating meteor-netsi-io... done, stack is cedar-14
https://meteor-netsi-io.herokuapp.com/ | https://git.heroku.com/meteor-netsi-io.git
Git remote heroku added
```
2.  `heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git` to make it possible to run meteor on heruko
```
Buildpack set. Next release on meteor-netsi-io will use https://github.com/AdmitHub/meteor-buildpack-horse.git.
Run git push heroku master to create a new release using this buildpack.
```
3.  `heroku addons:create mongolab` MongoDB is used by Meteor
```
Creating mongolab-amorphous-5462... done, (free)
Adding mongolab-amorphous-5462 to meteor-netsi-io... done
Setting MONGOLAB_URI and restarting meteor-netsi-io... done, v3
Welcome to MongoLab.  Your new subscription is being created and will be available shortly.  Please consult the MongoLab Add-on Admin UI to check on its progress.
Use `heroku addons:docs mongolab` to view documentation.
```
4.  Set root for app: `heroku config:set ROOT_URL=http://meteor.netsi.io`
```
Setting config vars and restarting meteor-netsi-io... done
ROOT_URL: http://meteor.netsi.io
```

## The actual Deploy to Heroku
`git push heroku master`

This will take some seconds, A lot of stuff is done as you can see here:
```
Counting objects: 22, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (15/15), done.
Writing objects: 100% (22/22), 3.42 KiB | 0 bytes/s, done.
Total 22 (delta 2), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Fetching set buildpack https://github.com/AdmitHub/meteor-buildpack-horse.git... done
remote: -----> Node.js app detected
remote: -----> Installing node
remote: -----> Installing meteor
remote: Downloading Meteor distribution
remote: ######################################################################## 100.0%
remote:
remote: Meteor 1.2.1 has been installed in your home directory (~/.meteor).
remote:
remote: Now you need to do one of the following:
remote:
remote:   (1) Add "$HOME/.meteor" to your path, or
remote:   (2) Run this command as root:
remote:         cp "/tmp/buildpack20151207-159-1sq6j94/meteor-V9CF/.meteor/packages/meteor-tool/1.1.10/mt-os.linux.x86_64/scripts/admin/launch-meteor" /usr/bin/meteor
remote:
remote: Then to get started, take a look at 'meteor --help' or see the docs at
remote: docs.meteor.com.
remote: -----> Bundling bundle
remote: -----> Building Meteor with ROOT_URL: http://meteor.netsi.io
remote: npm WARN deprecated This version of npm lacks support for important features,
remote: npm WARN deprecated such as scoped packages, offered by the primary npm
remote: npm WARN deprecated registry. Consider upgrading to at least npm@2, if not the
remote: npm WARN deprecated latest stable version. To upgrade to npm@2, run:
remote: npm WARN deprecated
remote: npm WARN deprecated   npm -g install npm@latest-2
remote: npm WARN deprecated
remote: npm WARN deprecated To upgrade to the latest stable version, run:
remote: npm WARN deprecated
remote: npm WARN deprecated   npm -g install npm@latest
remote: npm WARN deprecated
remote: npm WARN deprecated (Depending on how Node.js was installed on your system, you
remote: npm WARN deprecated may need to prefix the preceding commands with `sudo`, or if
remote: npm WARN deprecated on Windows, run them from an Administrator prompt.)
remote: npm WARN deprecated
remote: npm WARN deprecated If you're running the version of npm bundled with
remote: npm WARN deprecated Node.js 0.10 LTS, be aware that the next version of 0.10 LTS
remote: npm WARN deprecated will be bundled with a version of npm@2, which has some small
remote: npm WARN deprecated backwards-incompatible changes made to `npm run-script` and
remote: npm WARN deprecated semver behavior.
remote: npm WARN package.json meteor-dev-bundle@0.0.0 No description
remote: npm WARN package.json meteor-dev-bundle@0.0.0 No repository field.
remote: npm WARN package.json meteor-dev-bundle@0.0.0 No README data
remote:
remote: > fibers@1.0.5 install /tmp/build_eb310979d57bbfe68ee0cb374167b39d/.meteor/heroku_build/app/programs/server/node_modules/fibers
remote: > node ./build.js
remote:
remote: `linux-x64-v8-3.14` exists; testing
remote: Binary is fine; exiting
remote: ansi-regex@0.2.1 node_modules/ansi-regex
remote:
remote: ansi-styles@1.1.0 node_modules/ansi-styles
remote:
remote: escape-string-regexp@1.0.3 node_modules/escape-string-regexp
remote:
remote: chalk@0.5.1 node_modules/chalk
remote:
remote: strip-ansi@0.3.0 node_modules/strip-ansi
remote:
remote: supports-color@0.2.0 node_modules/supports-color
remote:
remote: has-ansi@0.1.0 node_modules/has-ansi
remote:
remote: eachline@2.3.3 node_modules/eachline
remote:
remote: type-of@2.0.1 node_modules/type-of
remote:
remote: amdefine@1.0.0 node_modules/amdefine
remote:
remote: asap@2.0.3 node_modules/asap
remote:
remote: underscore@1.5.2 node_modules/underscore
remote:
remote: meteor-promise@0.5.0 node_modules/meteor-promise
remote:
remote: promise@7.0.4 node_modules/promise
remote:
remote: source-map-support@0.3.2 node_modules/source-map-support
remote:
remote: semver@4.1.0 node_modules/semver
remote:
remote: source-map@0.1.32 node_modules/source-map
remote:
remote: fibers@1.0.5 node_modules/fibers
remote: -----> Adding PATH environment
remote: -----> Running extras
remote: -----> Adding MONGOHQ_URL -> MONGO_URL env
remote: -----> Adding MONGOLAB_URI -> MONGO_URL env
remote: -----> Installing phantomjs.
remote:
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing... done, 28.3MB
remote: -----> Launching... done, v5
remote:        https://meteor-netsi-io.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/meteor-netsi-io.git
 * [new branch]      master -> master
```

For now the app will be here: [
meteor-netsi-io.herokuapp.com](
meteor-netsi-io.herokuapp.com), however I will make a `CNAME` so that I can be reached on "[meteor.netsi.io](http://meteor.netsi.io)"
