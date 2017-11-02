[![npm](https://nodei.co/npm/help-version.png)](https://nodei.co/npm/help-version/)

# help-version

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Anything you wanted to do with `--help` and `--version`:

- checks these arguments in `process.argv`, so you don't have to;
- extracts `version` from your `package.json` file;
- returns functions that give you both `--help` and `--version`, in case you need to handle them differently;
- returns the function that prints `--help` and exits with the given code;
- highly configurable: you can set `process.argv`, `stdout` and `stderr` streams, and even `process.exit` function — this means testing won't be a problem.

[travis]: https://travis-ci.org/eush77/help-version
[travis-badge]: https://travis-ci.org/eush77/help-version.svg
[david]: https://david-dm.org/eush77/help-version
[david-badge]: https://david-dm.org/eush77/help-version.png

## Example

```js
#!/usr/bin/env node

var Cli = require('help-version');

var cli = Cli('Usage:  my-cat [file]');

cli.version()
//=> "v0.1.0"

if (process.argv.length != 3) {
  // Show help and exit with code 1.
  cli.help(1);
}

fs.createReadStream(process.argv[2])
  .pipe(process.stdout);
```

Catches `--help` and `--version` automatically.

```
$ ./cat.js --help
Usage:  my-cat [file]
$ ./cat.js --version
v0.1.0
$ ./cat.js file.txt
contents of file.txt
```

## API

### `cli = Cli(helpText, [opts])`

- `helpText` {String | Function} — help text to print on `--help`, or function to produce it.

Checks `opts.argv` for `--help` or `--version`.

1. If `--help` is found, prints `helpText` to `opts.stdout` and calls `opts.exit`.

2. If `--version` is found, prints app version (determined from the `version` field from your local `package.json`) to `opts.stdout` and calls `opts.exit`.

Returns object with two (bound) methods: `cli.help([code], [stream])` and `cli.version([code], [stream])`.

| Option         | Default                 |
| :------------: | :---------------------: |
| `argv`         | `process.argv.slice(2)` |
| `exit([code])` | `process.exit`          |
| `stdout`       | `process.stdout`        |
| `stderr`       | `process.stderr`        |

### `cli.help([code], [stream])`

With no arguments, returns the help string.

With one or two arguments, writes it to `stream` instead and exits (via `opts.exit`) with `code`. `stream` defaults to `opts.stdout` if `code==0` and `opts.stderr` otherwise.

### `cli.version([code], [stream])`

With no arguments, returns the version string.

With one or two arguments, writes it to the `stream` instead and exits (via `opts.exit`) with `code`. `stream` defaults to `opts.stdout` if `code==0` and `opts.stderr` otherwise.

## Install

```
npm install help-version
```

## License

MIT
