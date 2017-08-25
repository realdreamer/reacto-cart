// Will move the default local dev configs here..
'use strict';
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const WebpackDashboardPlugin = require('webpack-dashboard/plugin');
const EslintFormatter = require('react-dev-utils/eslintFormatter');

module.exports = function (_path) {
  return {
    // Don't attempt to continue if there are any errors.
    bail: true,
    devtool: 'cheap-module-source-map',
    entry: './app/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.bundle.js',
      publicPath: '/'
    },
    resolve: {
      modules: [
        path.join(__dirname, 'app'),
        'node_modules'
      ],
      extensions: ['.js', '.jsx', '.scss', '.css']
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'eslint-loader',
          options: {
            formatter: EslintFormatter,
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './app/index.html'
      }),
      new FlowBabelWebpackPlugin(),
      new WebpackDashboardPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
};
