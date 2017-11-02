'use strict';

var getVersion = require('./lib/get-version'),
    findOption = require('./lib/find-option');

var callsites = require('callsites'),
    once = require('once');


// Add newline if necessary.
var write = function (data, stream) {
  if (data.slice(-1) != '\n') {
    data += '\n';
  }
  (stream || this.stdout).write(data);
};


var maybeExit = function (data) {
  return function (code, stream) {
    if (typeof data == 'function') {
      data = data();
    }
    if (code == null) {
      return data;
    }
    if (stream == null) {
      stream = !code ? this.stdout : this.stderr;
    }
    write.call(this, data, stream);
    this.exit(code);
  }.bind(this);
};


module.exports = function (helpText, opts) {
  opts = opts || {};

  var getHelp = typeof helpText == 'function'
        ? once(helpText)
        : function () { return helpText };

  // Copy to a separate object to accomodate for passing `process` object with
  // getters.
  var options = {
    argv: opts.argv || process.argv.slice(2),
    exit: opts.exit || process.exit,
    stdout: opts.stdout || process.stdout,
    stderr: opts.stderr || process.stderr
  };

  var caller = callsites()[1].getFileName();
  var version = 'v' + getVersion(caller);

  switch (findOption(options.argv, ['--help', '--version'])) {
    case '--help':
      write.call(options, getHelp());
      options.exit();
      break;

    case '--version':
      write.call(options, version);
      options.exit();
      break;
  }

  return {
    help: maybeExit.call(options, getHelp),
    version: maybeExit.call(options, version)
  };
};
