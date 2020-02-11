const transmogrifier = require('emoji-transmogrifier');

const beerEmojiUrl = transmogrifier.getImage('beer');
console.log('the url of the GitHub emoji image for beer is: ' + beerEmojiUrl);

const beerUniStr = transmogrifier.getUnicode('beer');
console.log('the unicode string for beer is: ' + beerUniStr);

console.log('beers: ' + String.fromCodePoint(beerUniStr));
