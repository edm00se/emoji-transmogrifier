'use strict';

var emojisOb = require('../assets/emojis.json');
// RegEx pattern, https://regex101.com/r/hI5qF5/1
// `g` removed, as RegExp in JS is stateful,
// src: http://bjorn.tipling.com/state-and-regular-expressions-in-javascript
var re = /(\:\w+\:)(?=\s|[\!\.\?]|$)/im; // eslint-disable-line no-useless-escape
// GitHub API for emoji mapping short name to URL of image
// var emojisUrl = "https://api.github.com/emojis";

function getImg(key) {
  return emojisOb[key];
}
function extractEmojiUnicodeFromUrl(val) {
  var nwVal = val.split('unicode/')[1].split('?')[0].split('.png')[0];
  // console.log('found a val: ' + nwVal);
  return nwVal;
}
function getUni(key) {
  try {
    var url = emojisOb[key];
    var tmpCode = extractEmojiUnicodeFromUrl(url);
    return '0x' + tmpCode;
  } catch (e) {
    return null;
  }
}

module.exports = {
  getImage: getImg,
  getUnicode: getUni,
  theRegex: re
};
