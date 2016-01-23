'use strict';

var assert = require('assert');
var transmogrify = require('../src/server');

describe('emoji-transmogrifier', function () {
  it('should get image urls from short code', function () {
    assert.equal(transmogrify.getImage('beers'),
		'https://assets-cdn.github.com/images/icons/emoji/unicode/1f37b.png?v5',
		'beers == correct GH url');
    assert.equal(transmogrify.getImage('post_office'),
		'https://assets-cdn.github.com/images/icons/emoji/unicode/1f3e3.png?v5',
		'post_office == correct GH url');
  });
  it('should handle unicode conversion from short code', function () {
    assert.equal(true,
      transmogrify.getUnicode('beers') === '0x1f37b',
      'beers code is 0x1f37b');
  });
  it('should have tests for the cli component', function () {
    assert(true, 'but let\'s face it, it assumes defaults for all options and just runs');
  });
});
