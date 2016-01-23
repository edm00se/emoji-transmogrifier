'use strict';

var emojisOb = require('./emojis.json');
// var re = /(\:\w+\:)(?=\s|[\!\.\?]|$)/gim;

module.exports = function () {
  function getImg(key) {
    return emojisOb[key];
  }
  function getUni(key) {
    var url = emojisOb[key];
    if (url === null) {
      return null;
    }
    var tmpCode = extractEmojiUnicodeFromUrl(url);
    return '0x' + tmpCode;
  }
  function extractEmojiUnicodeFromUrl(val) {
    var nwVal = val.split('unicode/')[1].split('?')[0].split('.png')[0];
    console.log('found a val: ' + nwVal);
    return nwVal;
  }

  return {
    getImage: getImg,
    getUnicode: getUni
  };
};
