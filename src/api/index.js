'use strict';

const emojisOb = require('../assets/emojis.json');
/* RegEx pattern, https://regex101.com/r/hI5qF5/1
 * `g` removed, as RegExp in JS is stateful,
 * src: http://bjorn.tipling.com/state-and-regular-expressions-in-javascript
 */
const re = /(\:\w+\:)(?=\s|[\!\.\?]|$)/im; // eslint-disable-line no-useless-escape
// GitHub API for emoji mapping short name to URL of image
// var emojisUrl = "https://api.github.com/emojis";
const UNI_PREFIX = '0x';

const getImg = key => emojisOb[key];

// String.prototype.includes is nice, but...
const isRange = val => val.indexOf('-') !== -1;

const arrayMapUnicodePrefix = ar => ar.map(val => UNI_PREFIX + val);

function extractEmojiUnicodeFromUrl(val) {
  let nwVal;
  const tmp = val
    .split('unicode/')[1]
    .split('?')[0]
    .split('.png')[0];
  if (isRange(tmp)) {
    const ar = tmp.split('-');
    nwVal = [ar[0], ar[1]];
  } else {
    nwVal = tmp;
  }
  return nwVal;
}
function getUni(key) {
  try {
    var url = emojisOb[key];
    var tmp = extractEmojiUnicodeFromUrl(url);
    if (Array.isArray(tmp)) {
      // Array.map would be nice too...
      return arrayMapUnicodePrefix(tmp);
    }
    return UNI_PREFIX + tmp;
  } catch (e) {
    return null;
  }
}

module.exports = {
  getImage: getImg,
  getUnicode: getUni,
  theRegex: re
};
