'use strict';


module.exports = function (argv, options) {
  var found = null;

  argv.some(function (arg) {
    return options.some(function (option) {
      if (arg == option) {
        found = option;
        return true;
      }
    });
  });

  return found;
};
