'use strict';

const path = require('path');
const crossEnv = require('cross-env');
// let _ = require('lodash');

console.log(process.env.NODE_ENV);

const _configs = {
  // global section
  // global: require(__dirname + '/config/global'),

  // config by enviroments
  development: require(path.resolve(__dirname, 'config/webpack.config.dev')),
  test: require(path.resolve(__dirname, 'config/webpack.config.test')),
  production: require(path.resolve(__dirname, 'config/webpack.config.prod'))
};

const _loadConfig = function () {
  console.log(process.env.NODE_ENV);
  let ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
  console.log(ENV);
  return _configs && _configs[ENV](__dirname);
};

module.exports = _loadConfig();
