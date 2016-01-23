'use strict';

var assert = require('assert');
var transmogrify = require('../src');

describe('emoji-transmogrifier', function () {
  it('should get image urls', function () {
    assert.equal(transmogrify.getImage('beers'),
		'https://assets-cdn.github.com/images/icons/emoji/unicode/1f37b.png?v5',
		'beers == correct GH url');
  });
});
