'use strict';

const path = require('path');
const fs = require('fs');

// process.cwd() => it returns the current working directory of the application.
const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appRootPath: appDirectory,
  appBuild: resolveAppPath('build'),
  appPublic: resolveAppPath('public'),
  appSrc: resolveAppPath('app'),
  appIndexJs: resolveAppPath('app/index.js'),
  appIndexHtml: resolveAppPath('app/index.html'),
  appNodeModules: resolveAppPath('node_modules')
};
