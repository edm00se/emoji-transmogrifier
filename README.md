# emoji-transmogrifier [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> a handy little library for converting emoji short codes to html image tags

## Installation

```sh
$ npm install --save emoji-transmogrifier
```

## Usage

```js
var emojiTransmogrifier = require('emoji-transmogrifier');

emojiTransmogrifier('Rainbow');
```

Also available from CLI.

```sh
emoji-transmogrifier -in sourceFile -out destFile
```

## License

MIT © [Eric McCormick](https://edm00se.io/)


[npm-image]: https://badge.fury.io/js/emoji-transmogrifier.svg
[npm-url]: https://npmjs.org/package/emoji-transmogrifier
[travis-image]: https://travis-ci.org/edm00se/emoji-transmogrifier.svg?branch=master
[travis-url]: https://travis-ci.org/edm00se/emoji-transmogrifier
[daviddm-image]: https://david-dm.org/edm00se/emoji-transmogrifier.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/edm00se/emoji-transmogrifier
[coveralls-image]: https://coveralls.io/repos/edm00se/emoji-transmogrifier/badge.svg
[coveralls-url]: https://coveralls.io/r/edm00se/emoji-transmogrifier
