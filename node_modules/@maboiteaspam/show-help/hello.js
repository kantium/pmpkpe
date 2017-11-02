
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
