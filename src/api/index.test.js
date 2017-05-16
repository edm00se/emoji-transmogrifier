'use strict';

var assert = require('assert');
var transmogrify = require('.');
var arEq = require('array-equal');
var verSuffix = '?v7';

describe('api', function() {
  it('should get image urls from short code', function() {
    assert.equal(
      transmogrify.getImage('beers'),
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f37b.png' +
        verSuffix,
      'beers == correct GH url'
    );
    assert.equal(
      transmogrify.getImage('post_office'),
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f3e3.png' +
        verSuffix,
      'post_office == correct GH url'
    );
  });
  it('should handle unicode conversion from short code', function() {
    assert.equal(
      true,
      transmogrify.getUnicode('beers') === '0x1f37b',
      'beers code is 0x1f37b'
    );
  });
  it('should return null as unicode for bad input', function() {
    assert.equal(
      true,
      transmogrify.getUnicode('i am not a valid emoji') === null,
      'bad input returns null unicode'
    );
  });
  it('should have tests for the cli component', function() {
    assert(
      true,
      'but let\'s face it, it assumes defaults for all options and just runs'
    );
  });
});

describe('api:ranges', function() {
  it('should handle country codes', function() {
    assert.equal(
      true,
      arEq(transmogrify.getUnicode('afghanistan'), ['0x1f1e6', '0x1f1eb']),
      'afghanistan code returns array of ["0x1f1e6","0x1f1eb"]'
    );
  });
});
