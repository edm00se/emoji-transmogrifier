'use strict';

const assert = require('assert');
const transmogrify = require('.');
const arEq = require('array-equal');
const verSuffix = '?v8';

describe('api', () => {
  it('should get image urls from short code', () => {
    assert.strictEqual(
      transmogrify.getImage('beers'),
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f37b.png' +
        verSuffix,
      'beers == correct GH url'
    );
    assert.strictEqual(
      transmogrify.getImage('post_office'),
      'https://assets-cdn.github.com/images/icons/emoji/unicode/1f3e3.png' +
        verSuffix,
      'post_office == correct GH url'
    );
  });
  it('should handle unicode conversion from short code', () => {
    assert.strictEqual(
      true,
      transmogrify.getUnicode('beers') === '0x1f37b',
      'beers code is 0x1f37b'
    );
  });
  it('should return null as unicode for bad input', () => {
    assert.strictEqual(
      true,
      transmogrify.getUnicode('i am not a valid emoji') === null,
      'bad input returns null unicode'
    );
  });
  it('should have tests for the cli component', () => {
    assert(
      true,
      "but let's face it, it assumes defaults for all options and just runs"
    );
  });
});

describe('api:ranges', function() {
  it('should handle country codes', function() {
    assert.strictEqual(
      true,
      arEq(transmogrify.getUnicode('afghanistan'), ['0x1f1e6', '0x1f1eb']),
      'afghanistan code returns array of ["0x1f1e6","0x1f1eb"]'
    );
    assert.strictEqual(
      true,
      arEq(transmogrify.getUnicode('iraq'), ['0x1f1ee', '0x1f1f6']),
      'iraq code returns array of ["0x1f1ee","0x1f1f6"]'
    );
    assert.strictEqual(
      true,
      arEq(transmogrify.getUnicode('canada'), ['0x1f1e8', '0x1f1e6']),
      'canada code returns array of ["0x1f1e8","0x1f1e6"]'
    );
    assert.strictEqual(
      true,
      arEq(transmogrify.getUnicode('us'), ['0x1f1fa', '0x1f1f8']),
      'us code returns array of ["0x1f1fa","0x1f1f8"]'
    );
    assert.strictEqual(
      true,
      arEq(transmogrify.getUnicode('puerto_rico'), ['0x1f1f5', '0x1f1f7']),
      'puerto_rico code returns array of ["0x1f1f5","0x1f1f7"]'
    );
    assert.strictEqual(
      true,
      arEq(transmogrify.getUnicode('mexico'), ['0x1f1f2', '0x1f1fd']),
      'mexico code returns array of ["0x1f1f2","0x1f1fd"]'
    );
    assert.strictEqual(
      true,
      arEq(transmogrify.getUnicode('ireland'), ['0x1f1ee', '0x1f1ea']),
      'canada code returns array of ["0x1f1ee","0x1f1ea"]'
    );
  });
});
