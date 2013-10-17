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
        filesIn = this.data,
        props = [],
        propsValid = [],
        propsInvalid = [],
        propsValidStr = '',
        propsInvalidStr = '',
        lodashObjectsStr = '(' + options.lodashObjects.join('|') + ')',
        lodashObjectsPattern = lodashObjectsStr + '\\.',
        lodashUsagePattern = lodashObjectsPattern + '\\w*';
   
    if(_.isString(filesIn))
      filesIn = [filesIn] 

    filesIn.forEach(function(f) {
      var files = grunt.file.expand(f),
          matchlines = shelljs.grep(lodashUsagePattern, files),
          matches = matchlines.match(new RegExp(lodashUsagePattern, 'gi'));

      if(!_.isArray(matches))
        return;

      for(var i=0; i < matches.length; i++)
        matches[i] = matches[i].split('.').slice(-1)[0];

      props = props.concat(matches);
    });

    // Remove duplicates 
    props = _.uniq(props).sort();
    // Remove invalid property names
    propsInvalid = _.difference(props, _.keys(_)); 
    propsValid = _.intersection(props, _.keys(_));
    propsValidStr = propsValid.join(', ')
    propsInvalidStr = propsInvalid.join(', ')

    grunt.log.oklns("Found the following lodash v" + _.VERSION + " methods/properties:\n" +
      grunt.log.wordlist(propsValid, {color: 'green'}) + "\n");
    if(propsInvalidStr)
      grunt.log.errorlns("Also found these invalid methods/properties, skipping:\n" +
        grunt.log.wordlist(propsInvalid, {color: 'red'}) + "\n");
    grunt.config.set(options.lodashConfigPath, propsValidStr);
    grunt.task.run('lodash')
  });

};
