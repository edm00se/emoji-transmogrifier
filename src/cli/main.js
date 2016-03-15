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
    .action(function (zap, glob) {
      var fCt = 0;
      var mCt = 0;
      var myGlob = glob||"**/*.md";
      console.log('glob: ' + myGlob);
      function err(er) {
        if (er) {
          console.log('error: ' + er);
        } else {
          console.log('writing file back with updates');
        }
      }
      function writeContentsBackToFile(fileName, fileContents){
        fs.writeFileSync(fileName, fileContents, 'utf-8', err);
        console.log('  wrote out to ' + curVal );
      }
      var files = globber.sync(myGlob);
      console.log(files.length + ' files: ' + files);
      for (var i = 0; i < files.length; i++) {
        var curVal = files[i];
        console.log('checking ' + curVal + ' for short codes');
        var contents = fs.readFileSync(curVal, 'utf-8');
        fCt++;
        if (re.test(contents)) {
          mCt++;
          var foundMatch = false;
          for (var prop in emojisOb) {
            if (contents.indexOf(':' + prop + ':') > -1) {
              // console.log('found a ' + prop + ' in ' + curVal);
              foundMatch = true;
              var nwRe = new RegExp(':' + prop + ':', 'gi');
              var url = transmogrify.getImage(prop);
              contents = contents.replace(nwRe, '<img src=' + url + ' alt=' + prop + ' style="height:auto;width:21px;">');
            }
          }
          console.log('  found a match?: ' + foundMatch);
          if (foundMatch) {
            writeContentsBackToFile(curVal, contents);
          }
        }else{
          console.log('  failed the short code regex check');
        }
      }
      console.log('converted ' + mCt + ' occurrences over ' + fCt + ' files');
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
