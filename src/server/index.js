'use strict';

var emojisOb = require('../assets/emojis.json');
// RegEx pattern, https://regex101.com/r/hI5qF5/1
// `g` removed, as RegExp in JS is staeful,
// src: http://bjorn.tipling.com/state-and-regular-expressions-in-javascript
var re = /(\:\w+\:)(?=\s|[\!\.\?]|$)/im;
// GitHub API for emoji mapping short name to URL of image
// var emojisUrl = "https://api.github.com/emojis";

function getImg(key) {
  return emojisOb[key];
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
function extractEmojiUnicodeFromUrl(val) {
  var nwVal = val.split('unicode/')[1].split('?')[0].split('.png')[0];
  // console.log('found a val: ' + nwVal);
  return nwVal;
}

exports.getImage = getImg;
exports.getUnicode = getUni;
exports.theRegex = re;
