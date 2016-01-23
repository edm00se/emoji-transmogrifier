'use strict';

var emojisOb = require('../assets/emojis.json');
// RegEx pattern, https://regex101.com/r/hI5qF5/1
var re = /(\:\w+\:)(?=\s|[\!\.\?]|$)/gim;
// GitHub API for emoji mapping short name to URL of image
// var emojisUrl = "https://api.github.com/emojis";

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
  // console.log('found a val: ' + nwVal);
  return nwVal;
}

exports.getImage = getImg;
exports.getUnicode = getUni;
exports.theRegex = re;
