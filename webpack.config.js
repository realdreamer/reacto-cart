'use strict';

// let _ = require('lodash');

const _configs = {
  // global section
  // global: require(__dirname + '/config/global'),

  // config by enviroments
  production: require(__dirname + '/config/webpack.prod.config'),
  test: require(__dirname + '/config/webpack.test.config'),
  development: require(__dirname + '/config/webpack.dev.config')
};

const _loadConfig = function () {
  let ENV = process.env.NODE_ENV
              ? process.env.NODE_ENV
              :   'production';

  return _configs && _configs[ENV](__dirname);
}

module.exports = _loadConfig();
