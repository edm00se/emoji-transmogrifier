const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const rawTestCasePath = path.resolve('test-case', 'raw');
const processedTestCasePath = path.resolve('test-case', 'processed');
const glob = require('glob');

describe('main cli', () => {
  let rawTestCases = [];

  // preserve test case contents
  beforeEach(() => {
    glob(path.resolve(rawTestCasePath, '**/*.md'), (er, files) => {
      if (er) {
        throw new Error(er);
      }
      files.forEach(file => {
        const data = fs.readFileSync(file, 'utf-8');
        rawTestCases.push({
          name: file,
          content: data
        });
      });
    });
  });

  // restore test case contents
  afterEach(() => {
    rawTestCases.forEach(file => {
      fs.writeFileSync(file.name, file.content, 'utf-8');
    });
  });

  it('should execute without errors', async () => {
    const result = await cli(['zap'], rawTestCasePath);
    expect(result.code).toBe(0);
  });

  it('should update markdown accordingly', async () => {
    await cli(['zap'], rawTestCasePath);
    const procFileNameSplit = rawTestCases[0].name.split('/');
    const procFileName = procFileNameSplit[procFileNameSplit.length - 1];

    const rawProcessedFirstFileContents = fs.readFileSync(
      path.resolve(processedTestCasePath, procFileName),
      'utf-8'
    );
    const testCaseProcessedFirstFileContents = fs.readFileSync(
      rawTestCases[0].name,
      'utf-8'
    );
    expect(testCaseProcessedFirstFileContents).not.toBe(
      rawTestCases[0].content
    );
    expect(testCaseProcessedFirstFileContents).toBe(
      rawProcessedFirstFileContents
    );
  });
});

function cli(args, cwd) {
  return new Promise(resolve => {
    exec(
      `node ${path.resolve('src', 'cli', './index')} ${args.join(' ')}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      }
    );
  });
}
