'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.lodash_autobuild = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    // Test for the include="fn, fn, ..." string in the outputted file
    var re = /include=".*"/,
        matches = grunt.file.read('tmp/build.js').match(re),
        actual = (matches != null) ? matches[0].trim() : '',
        expected = grunt.file.read('test/expected/default_options').trim();

    test.equal(actual, expected, 'lodash cli include modules match those expected');
    test.done();
  }
};
