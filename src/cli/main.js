var updateNotifier = require('update-notifier');
var pkg = require('../../package.json');
var prog = require('commander');
var fs = require('fs');
var transmogrify = require('../server');
var re = transmogrify.theRegex;
var emojisOb = require('../assets/emojis.json');
var globber = require('glob');
module.exports = function () {
  updateNotifier({pkg}).notify();
  prog
    .version(pkg.version)
    .usage('<cmd>');

  prog
    .command('zap')
    .usage('<glob>')
    .description('convert emoji short codes in specified files to image tags')
    .action(function (glob) {
      var fCt = 0;
      var mCt = 0;
      var myGlob = '**/*.md';
      if (typeof glob === "string") {
        myGlob = glob;
      }
      console.log('glob: ' + myGlob);
      globber(myGlob, function (er, files) {
        if (er) {
          console.log('error: ' + er);
        }
        console.log('scanning ' + files);
        if (files.length < 1) {
          console.log('no files found, matching ' + myGlob);
        } else {
          files.forEach(function (curVal) {
            fCt++;
            fs.readFile(curVal, 'utf-8', function (err, data) {
              if (err) {
                console.log('  error: ' + err);
              }
              if (re.test(data)) {
                mCt++;
                var foundMatch = false;
                for (var prop in emojisOb) {
                  if (data.indexOf(':' + prop + ':') > -1) {
                    foundMatch = true;
                    var nwRe = new RegExp(':' + prop + ':', 'gim');
                    var url = transmogrify.getImage(prop);
                    data = data.replace(nwRe, '<img src=' + url + ' alt=' + prop + ' style="height:auto;width:21px;">');
                  }
                }
                if (foundMatch) {
                  fs.writeFile(curVal, data, 'utf-8', err);
                }
              }
            });
          });
        }
      });
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
