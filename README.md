# emoji-transmogrifier

[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads]][npm-url] [![Build Status][gh-action-image]][gh-action-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Codecov][codecov-image]][codecov-url] [![Codacy Badge](https://api.codacy.com/project/badge/grade/ffa1d59c52fe402796c373de4bc840d2)](https://www.codacy.com/app/edm00se/emoji-transmogrifier) [![semantic-release][semantic-release-image]][semantic-release-url] [![npm][npm-license]][npm-url]

> A handy little library (written as a Node.js module) for converting emoji short codes into HTML image tags. This is mostly a project to force myself to go through all the steps of creating a Node module.

## Transmogrifier
[![Calvin and Hobbes](src/assets/zap.jpg)](http://www.calvinandhobbes.com/)

## Installation
[![NPM](https://nodei.co/npm/emoji-transmogrifier.png)](https://nodei.co/npm/emoji-transmogrifier/)

#### Globally
```sh
$ npm install -g emoji-transmogrifier
```

## Usage

Using the module is currently available from the command line as a brief utility to autmoate the conversion of the short code strings in markdown or html files and for traditional Node module consumption (aka- via a `require()` statement).

#### CLI Utility
The command line tool now has the previous functionality under the `zap` command and provides the server module's `getImage` and `getUnicode` functionality exposed by the `unicode` (or `uni`) and `url` (or `href`) commands, respectively. The `zap` command keeps the same `-d` (or `--directory`) and `-t` (or `--type`) as before, but will default to the current directory and markdown files ending in `.md`.

For specifics about a give command, invoke the command followed by `-h`, such as `emoji-transmogrifier zap -h`.

```sh
  Usage: emoji-transmogrifier <cmd>


  Commands:

    zap   			convert emoji short codes in specified files (globbing pattern, defaults to `**/*.md`) to image tags
    unicode|uni     returns the unicode interpretation of the given emoji short code
    url|href        returns the GitHub url of the given emoji by short code

  Options:

    -h, --help  output usage information
```

#### Server Module
```js
var transmogrifier = require('emoji-transmogrifier');

var beerEmojiUrl = transmogrifier.getImage('beer');
console.log('the url of the GitHub emoji image for beer is: '+beerEmojiUrl);

var beerUniStr = transmogrifier.getUnicode('beer');
console.log('the unicode string for beer is: '+beerUniStr);
```


## History

This project was born from the need I had to convert the emoji short codes, a la `:smile:`, to an HTML image tag, for use with a book I'm writing with [gitbook](https://github.com/GitbookIO/gitbook). The web static version generated by gitbook was fine with some scripts I had injected to handle them, but ran into issues when generating the `pdf`, `mobi`, or `epub` versions of the book, yielding the original short code text. This project is the next evolutionary version of the script I created to perform the conversion.

## RegEx Pattern
At the heard of this task is a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) that performs the matching of the short code which is to be replaced.

The RegEx pattern I settled on can be viewed and tested against the known emoji short codes by viewing the pattern here:
https://regex101.com/r/hI5qF5/1

The pattern itself:

```js
/(\:(\w|\+|\-)+\:)(?=\s|[\!\.\?]|$)/gim
```

## Road Map

- [x] complete coveralls implementation
- [x] add alternate cli function of exposing the internal methods to the 'server' module
  - [x] provide return of image path (href)
  - [x] provide return of unicode string
- [x] provide current conversion function ability to traverse subdirectories
- [x] add range support, as discussed in [#20](https://github.com/edm00se/emoji-transmogrifier/issues/20)

## Contributing
Please [consult and follow the contribution guide](https://github.com/edm00se/emoji-transmogrifier/blob/master/CONTRIBUTING.md) prior to submitting any Pull Requests.

## License

MIT


[npm-image]: https://badge.fury.io/js/emoji-transmogrifier.svg
[npm-downloads]: https://img.shields.io/npm/dt/emoji-transmogrifier.svg
[npm-url]: https://npmjs.org/package/emoji-transmogrifier
[npm-license]: https://img.shields.io/npm/l/emoji-transmogrifier.svg
[gh-action-image]: https://github.com/edm00se/emoji-transmogrifier/workflows/Node%20CI/badge.svg?branch=master
[gh-action-url]: https://github.com/edm00se/emoji-transmogrifier/actions?query=workflow%3A%22Node+CI%22
[daviddm-image]: https://david-dm.org/edm00se/emoji-transmogrifier.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/edm00se/emoji-transmogrifier
[codecov-url]: https://codecov.io/github/edm00se/emoji-transmogrifier
[codecov-image]: https://img.shields.io/codecov/c/github/edm00se/emoji-transmogrifier.svg
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
