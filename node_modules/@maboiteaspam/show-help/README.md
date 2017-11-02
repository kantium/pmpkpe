# show-help

node module helper to display help section given command line arguments

## Install

    npm i @maboiteaspam/show-help --save

## Usage

```js
function usage () {/*
    ...some text...
    ...about your program...
*/}
var pkg   = require('./package.json')
var help  = require('@maboiteaspam/show-help')(usage, process.argv, pkg)     // manage -h|--help
var debug = require('@maboiteaspam/set-verbosity')(pkg.name, process.argv);  // manage -v|--verbose [what?]
!argv['_'] && showHelp.print(usage, pkg) && showHelp.die();                  // manage some wrong invocation
```

## Usage

#### process.argv

Using the node `process.argv` value

```js
function usage () {/*
module name
        ...

    Usage
        ...

    Options
        ...

    Examples
        ...
*/}

var pkg       = require('./package.json')                           // always useful.
var showHelp  = require('./index.js')                               // load showHelp,
  .tpl('%name %version\n\t%description\n\n%usage')                  // set a different template.
  (usage, process.argv, pkg)                                        // Print help and quit,
                                                                    // if -h|--help.

//require('./index.js')(usage, process.argv, pkg)                   // one-liner

!argv['_']                                                          // if arguments are incorrect,
&& showHelp.print(usage, pkg)                                       // show help,
&& showHelp.die();                                                  // exit.

console.log('program execution')

```

Which then, can be invoked in such fashion
```sh
module-name -h
module-name --help
```

#### minimist

Using `minimist` module to pre parse values

```js
function usage () {/*
module name
        ...

    Usage
        ...

    Options
        ...

    Examples
        ...
*/}
var pkg       = require('./package.json')                           // always useful.
var argv      = require('minimist')(process.argv.slice(2));         // parse args with minimist,
var showHelp  = require('./index.js')                               // load showHelp,
  .tpl('%name %version\n\t%description\n\n%usage')                  // set a different template.
  (usage, argv.h||argv.help, pkg)                                   // Print help and quit,
                                                                    // if -h|--help.

//require('./index.js')(usage, argv.h||argv.help, pkg)              // one-liner

!argv['_']                                                          // if arguments are incorrect,
&& showHelp.print(usage, pkg)                                       // show help,
&& showHelp.die();                                                  // exit.

console.log('program execution')


```

Which then, can be invoked in such fashion
```sh
module-name -h
module-name --help
```

## Api

#### showHelp

`showHelp` is a `function` to display help and exit when needed,
it returns `showHelp` for a fluent interface.

- __showHelp(callable fn, object arg, object pkg, int code) void__

When `typeof(arg)` is object, detect `(-h|--help)`,
and figures out if `usage` should be displayed and program killed.

`pkg` is object of `package.json` file.

- __showHelp(callable fn, string arg, object pkg, int code) void__

When `typeof(arg)` is string, and not `falsy`,
it displays `usage` and kills the program with `code`.

`pkg` is object of `package.json` file.

- __showHelp(callable fn, bool arg, object pkg, int code) void__

When `typeof(arg)` is bool, and not `falsy`,
it displays `usage` and kills the program with `code`.

`pkg` is object of `package.json` file.

#### showHelp.tpl

`showHelp.tpl` is a function to set a template to render usage,
it returns `showHelp` for a fluent interface.

- __showHelp(string newTpl) showHelp__

set `tpl` to `newTpl`, then returns `showHelp` for chaining.

#### showHelp.raw

`showHelp.raw` is a function to parse a `string` as a command line input.
It detects `-h|--help` and invoke `showHelp.parsed`.
It returns `true`, if it has displayed help, otherwise `false`.

- __showHelp.raw(callable fn, object pkg, string arg) bool__

When `arg.match(/-h|--help/)` is not `falsy`, it renders and displays `usage`.

#### showHelp.parsed

`showHelp.parsed` is a function to invoke `showHelp.print` when `arg` is not `falsy`.
It returns `true`, if it has displayed help, otherwise `false`.

- __showHelp.parsed(callable fn, object pkg, string arg) bool__

When `arg` is not `falsy`, it renders and displays `usage`.

#### showHelp.print

`showHelp.print` is a function to render `template` given `multiline(fn)` usage string and `pkg` object,
then prints it on `console.error`.
It returns `true`, always, for fluent interface with `die()`.

- __showHelp.print(callable fn, object pkg) true__

Renders `usage` then print it on `console.error`.

#### showHelp.die

`showHelp.die` is a function to exist process

- __showHelp.die(int exitCode) void__

Exist process.

## More

- https://github.com/sindresorhus/multiline
- https://nodejs.org/api/process.html#process_process_argv
- https://github.com/maboiteaspam/npi
- https://github.com/maboiteaspam/set-verbosity
