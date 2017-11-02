'use strict';

var findRoot = require('find-root');

var path = require('path');


/**
 * Get module version from the file path.
 *
 * Uses find-root to find root package directory from file path and
 * reads the "version" field from "package.json" in that directory.
 */
module.exports = function (caller) {
  var pkgPath = path.join(findRoot(caller), 'package.json');
  return require(pkgPath).version;
};
