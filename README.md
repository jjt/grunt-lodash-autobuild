grunt-lodash-autobuild
======================

A Grunt plugin that analyzes source js/cs/html files for lodash functions and
produces a minimal lodash build. Uses `shelljs.grep()` to find instances of
`/_.\w*/` in the provided files and passes them as options to the
[grunt-lodash](https://github.com/lodash/grunt-lodash) plugin.

## Getting Started
This plugin requires Grunt `~0.4.*`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. 

In addition to installing this plugin, you'll also need to install grunt-lodash:

```shell
$> npm install --save-dev grunt-lodash
$> npm install --save-dev grunt-lodash-autobuild
```

Once the plugins have been installed, they may be enabled inside your Gruntfile
with these lines of JavaScript:

```js
grunt.loadNpmTasks('grunt-lodash');
grunt.loadNpmTasks('grunt-lodash-autobuild');
```


## Note: Lodash Version

The `grunt-lodash-autobuild` package.json calls for `>=2.0.0` for both `lodash`
and `lodash-cli`. This means that you'll likely be building from the most recent
stable version of lodash. I don't see this as a problem, since the library is
fairly stable and ideally one would be keeping up with updates, but you'd
probably be able to muck about to get a different version.

##Example Gruntfile.js:

    module.exports = function(grunt) {
      grunt.initConfig({
        // grunt-lodash configuration
        lodash: {
          build: {
            dest: 'build/lodash.build.js',
            options: {
              exports: ['none']
              // lodash-autobuild will add this after analysis of source code
              // include: "names, of, lodash, methods, in, your, source" 
            }
          }
        },
        lodashAutobuild: {
          // Multiple autobuild targets supported
          app: {
            // The path to your source file(s)
            src: ['src/js/**/*.js', 'src/coffee/**/*.coffee'],
            // Default options:
            options: {
              // Set to the configured lodash task options.include
              lodashConfigPath: 'lodash.build.options.include'
              // The name(s) of the lodash object(s)
              lodashObjects: [ '_' ],
              // Undefined lodashTargets or an empty targets
              // array will run all lodash targets. Specify
              // targets by name to run specific targets
              lodashTargets: [ 'build' ]
            }            
          }
        }
      });
      
      grunt.loadNpmTasks('grunt-lodash');
      grunt.loadNpmTasks('grunt-lodash-autobuild');
      
      grunt.registerTask('default', ['lodashAutobuild']);
    }
