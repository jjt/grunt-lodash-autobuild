grunt-lodash-autobuild
======================

A Grunt plugin that analyzes source js/cs/html files for lodash functions and produces a minimal lodash build.
Uses `shelljs.grep()` to find instances of `/_.\w*/` in the provided files and passes them as options to the [grunt-lodash](https://github.com/lodash/grunt-lodash)
plugin.

## Getting Started
This plugin requires Grunt `~0.4.*`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started)
guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install
and use Grunt plugins. 

In addition to installing this plugin, you'll also need to install grunt-lodash:

```shell
$> npm install --save-dev grunt-lodash
$> npm install --save-dev grunt-lodash-autobuild
```

Once the plugins have been installed, they may be enabled inside your Gruntfile with these lines of JavaScript:

```js
grunt.loadNpmTasks('grunt-lodash');
grunt.loadNpmTasks('grunt-lodash-autobuild');
```

###Example Gruntfile.js:

    module.exports = function(grunt) {
      grunt.initConfig({
        lodash: {
          build: {
            dest: 'build/lodash.build.js',
            options: {
              exports: ['none']
            }
          }
        },
        lodashAutobuild: {
          // The path to your source file(s)
          src: ['src/js/**/*.js', 'src/coffee/**/*.coffee'],
          options: {
            // Set to the configured lodash task options.include
            lodashConfigPath: 'lodash.build.options.include'
            // The name of the lodash object(s) (default: '_')
            lodashObjects: [ '_', 'lodash', 'underscore' ]
          }
        }
      });
      
      grunt.loadNpmTasks('grunt-lodash');
      grunt.loadNpmTasks('grunt-lodash-autobuild');
      
      grunt.registerTask('default', ['lodashAutobuild']);
    }
