/*
 * grunt-lodash-autobuild
 * https://github.com/jjt/grunt-lodash-autobuild
 *
 * Copyright (c) 2013 jjt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('lodashAutobuild', 'Analyzes your source js/cs/html/etc. and custom builds a minimal version of lodash', function() {
    var options = this.options({
      lodashConfigPath: 'lodash.build.options.include'
    });

    var shelljs = require('shelljs');
    var _ = require('lodash');
    var fns = [], fnsStr = '';
    var filesIn = this.data

    if(_.isString(filesIn))
      filesIn = [filesIn] 

    filesIn.forEach(function(f) {
      var files = grunt.file.expand(f);
      var matchlines = shelljs.grep('_\.\w*', files);
      var matches = matchlines.match(/_\.\w*/gi);
      if(!_.isArray(matches))
        return;
      matches.forEach(function(match, i) {
        matches[i] = match.replace('_.', '');
      });
      fns = fns.concat(matches);
    });

    fns = _.uniq(fns).sort();
    fnsStr = fns.join(', ')
    grunt.config.set(options.lodashConfigPath, fnsStr);
    grunt.log.write("Found the following lodash functions:\n" + fnsStr);
    grunt.task.run('lodash')
  });

};
