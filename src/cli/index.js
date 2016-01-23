var updateNotifier = require('update-notifier');
var pkg = require('../../package.json');
var prog = require('commander');
var fs = require('fs');
var transmogrify = require('../server');
var re = transmogrify.theRegex;
var emojisOb = require('../assets/emojis.json');
module.exports = function () {
  updateNotifier({pkg}).notify();
  prog
    .version(pkg.version)
    .usage('[options]')
    .option('-d, --directory <directory/>', 'The path inside of which to convert (default= ./)')
    .option('-t, --type [type]', 'The file extensions to work against (default= md)', /^(md|markdown|html|htm)$/i)
    .parse(process.argv);

  console.log('you want to convert the short codes from the files in:');
  var filePath = prog.directory || './';
  console.log('  - dir ' + filePath);
  var ext = '.' + (prog.extension || 'md');
  console.log('  - extension ' + ext);
  var fCt = 0;
  var mCt = 0;
  var fileNameAr = fs.readdirSync(filePath);
  function err(er) {
    if (er) {
      console.log('error: ' + er);
    } else {
      console.log('writing file back with updates');
    }
  }
  for (var i = 0; i < fileNameAr.length; i++) {
    var curVal = filePath + fileNameAr[i];
    if (curVal.substr(-ext.length) === ext) {
      var file = curVal;
      var contents = fs.readFileSync(file, 'utf-8');
      fCt++;
      if (re.test(contents)) {
        // console.log('match found in '+file);
        mCt++;
        var result = contents;
        var foundMatch = false;
        for (var prop in emojisOb) {
          if (contents.indexOf(':' + prop + ':') > -1) {
            foundMatch = true;
            // console.log('found a match for '+prop+' in '+file);
            var nwRe = new RegExp(':' + prop + ':', 'gi');
            var url = 'https://assets-cdn.github.com/images/icons/emoji/unicode/' + emojisOb[prop] + '.png?v5';
            result = result.replace(nwRe, '<img src="' + url + '" alt="' + prop + '" style="height:auto;width:21px;">');
          }
        }
        if (foundMatch) {
          fs.writeFile(file, result, 'utf-8', err);
        }
      }
    }
  }
  console.log('converted ' + mCt + ' occurrences over ' + fCt + ' ' + ext + ' files');
  console.log('done');
};
