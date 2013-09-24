grunt-lodash-autobuild
======================

A Grunt plugin that analyzes source js/cs/html files for lodash functions and produces a minimal lodash build.
Uses `shelljs.grep()` to find instances of `/_.\w*/` in the provided files and passes them as options to the `grunt-lodash`
plugin.

The `lodashAutobuild` task simply triggers an existing `lodash` task, so make sure to define one.

Example Gruntfile.js:

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
          }
        }
      });
      
      grunt.loadNpmTasks('grunt-lodash-autobuild');
      grunt.loadNpmTasks('grunt-lodash');
      
      grunt.registerTask('default', ['lodashAutobuild']);
    }
