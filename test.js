#! /usr/local/bin/node

var emojisOb = require('./src/emojis.json');
var sampleUrl = "https://assets-cdn.github.com/images/icons/emoji/unicode/1f424.png?v5";

console.log(String.fromCodePoint("0x1f37a"));
function getUni( key ){
	var url = emojisOb[key];
	if( null != url ){
		var tmpCode = extractEmojiUnicodeFromUrl(url);
		return "0x"+tmpCode;
	}else{
		return null;
	}
}
function extractEmojiUnicodeFromUrl( val ){
	var nwVal = val.split("unicode/")[1].split("?")[0].split(".png")[0];
	console.log("found a val: "+nwVal);
	return nwVal;
}
var myDrink = getUni("beers");
console.log(String.fromCodePoint(myDrink));