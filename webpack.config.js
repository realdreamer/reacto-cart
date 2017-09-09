'use strict';

const path = require('path');
// let _ = require('lodash');

const _configs = {
  // global section
  // global: require(__dirname + '/config/global'),

  // config by enviroments
  production: require(path.resolve(__dirname, 'config/webpack.config.prod')),
  test: require(path.resolve(__dirname, 'config/webpack.config.test')),
  development: require(path.resolve(__dirname, 'config/webpack.config.dev'))
};

const _loadConfig = function () {
  let ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
  return _configs && _configs[ENV](__dirname);
};

module.exports = _loadConfig();
