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
      lodashConfigPath: 'lodash.build.options.include',
      lodashObjects: [ '_' ]
    });

    var shelljs = require('shelljs'),
      _ = require('lodash'),
      fns = [],
      fnsStr = '',
      filesIn = this.data,
      lodashObjectsStr = '(' + options.lodashObjects.join('|') + ')',
      lodashObjectsPattern = lodashObjectsStr + '\\.',
      lodashUsagePattern = lodashObjectsPattern + '\\w*';
   
    if(_.isString(filesIn))
      filesIn = [filesIn] 

    filesIn.forEach(function(f) {
      var files = grunt.file.expand(f);
      var matchlines = shelljs.grep(lodashUsagePattern, files);
      var matches = matchlines.match(new RegExp(lodashUsagePattern, 'gi'));
      if(!_.isArray(matches))
        return;
      matches.forEach(function(match, i) {
        matches[i] = match.split('.').slice(-1);
      });
      fns = fns.concat(matches);
    });

    fns = _.uniq(fns).sort();
    fnsStr = fns.join(', ')
    grunt.log.write("Found the following lodash functions:\n" + fnsStr + "\n");
    grunt.config.set(options.lodashConfigPath, fnsStr);
    grunt.task.run('lodash')
  });

};
