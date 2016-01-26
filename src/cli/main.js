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
    .usage('<cmd>');

  prog
    .command('zap')
    .usage('[options]')
    .description('convert emoji short codes in specified files to image tags')
    .option('-d, --directory <directory/>', 'The path inside of which to convert (default= ./)')
    .option('-t, --type [type]', 'The file extensions to work against (default= md)', /^(md|markdown|html|htm)$/i)
    .action(function () {
      var my = this;
      console.log('you want to convert the short codes from the files in:');
      var filePath = my.directory || './';
      if (filePath.substr(-1) !== '/') {
        filePath += '/';
      }
      console.log('  - dir ' + filePath);
      var ext = '.' + (my.type || 'md');
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
          console.log('found a ' + ext + ' file');
          var file = curVal;
          var contents = fs.readFileSync(file, 'utf-8');
          fCt++;
          if (re.test(contents)) {
            // console.log('match found in '+file);
            mCt++;
            var foundMatch = false;
            for (var prop in emojisOb) {
              if (contents.indexOf(':' + prop + ':') > -1) {
                foundMatch = true;
                // console.log('found a match for '+prop+' in '+file);
                var nwRe = new RegExp(':' + prop + ':', 'gi');
                var url = transmogrify.getImage(prop);
                contents = contents.replace(nwRe, '<img src=' + url + ' alt=' + prop + ' style="height:auto;width:21px;">');
              }
            }
            if (foundMatch) {
              fs.writeFile(file, contents, 'utf-8', err);
            }
          }
        }
      }
      console.log('converted ' + mCt + ' occurrences over ' + fCt + ' ' + ext + ' files');
      console.log('done');
    });

  prog
    .command('unicode')
    .alias('uni')
    .usage('<shortCode>')
    .description('returns the unicode interpretation of the given emoji short code')
    .action(function (shortCode) {
      console.log(String.fromCodePoint(transmogrify.getUnicode(shortCode)));
    });

  prog
    .command('url')
    .alias('href')
    .usage('<shortCode>')
    .description('returns the GitHub url of the given emoji by short code')
    .action(function (shortCode) {
      console.log(transmogrify.getImage(shortCode));
    });

  prog.parse(process.argv);

  if (!prog.args.length) {
    prog.help();
  }
};
