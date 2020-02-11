const updateNotifier = require('update-notifier');
const pkg = require('../../package.json');
const prog = require('commander');
const fs = require('fs');
const transmogrify = require('../api');
const re = transmogrify.theRegex;
const emojisOb = require('../assets/emojis.json');
const globber = require('glob');
module.exports = function() {
  updateNotifier({ pkg }).notify(); /* eslint-disable-line */
  prog.version(pkg.version).usage('<cmd>');

  prog
    .command('zap')
    .usage('<glob>')
    .description('convert emoji short codes in specified files to image tags')
    .action(glob => {
      const myGlob = '**/*.md';
      if (typeof glob === 'string') {
        myGlob = glob;
      }
      console.log('glob: ' + myGlob);
      globber(myGlob, (er, files) => {
        if (er) {
          console.log('error: ' + er);
        }
        console.log('scanning ' + files);
        if (files.length < 1) {
          console.log('no files found, matching ' + myGlob);
        } else {
          files.forEach(curVal => {
            fs.readFile(curVal, 'utf-8', (err, data) => {
              if (err) {
                console.log('  error: ' + err);
              }
              if (re.test(data)) {
                let foundMatch = false;
                for (let prop in emojisOb) {
                  if (data.indexOf(':' + prop + ':') > -1) {
                    foundMatch = true;
                    const nwRe = new RegExp(':' + prop + ':', 'gim');
                    const url = transmogrify.getImage(prop);
                    data = data.replace(
                      nwRe,
                      '<img src=' +
                        url +
                        ' alt=' +
                        prop +
                        ' style="height:auto;width:21px;">'
                    );
                  }
                }
                if (foundMatch) {
                  fs.writeFile(curVal, data, 'utf-8', writeErr => {
                    if (writeErr) {
                      console.log(writeErr);
                    }
                  });
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
    .description(
      'returns the unicode interpretation of the given emoji short code'
    )
    .action(shortCode => {
      const uniCodeStr = transmogrify.getUnicode(shortCode);
      if (Array.isArray(uniCodeStr)) {
        console.log(String.fromCodePoint(...uniCodeStr));
      } else {
        console.log(String.fromCodePoint(uniCodeStr));
      }
    });

  prog
    .command('url')
    .alias('href')
    .usage('<shortCode>')
    .description('returns the GitHub url of the given emoji by short code')
    .action(shortCode => {
      console.log(transmogrify.getImage(shortCode));
    });

  prog.parse(process.argv);

  if (!prog.args.length) {
    prog.help();
  }
};
