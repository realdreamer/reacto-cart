// Will move the default local dev configs here..
'use strict';
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
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
      path: path.resolve(_path, 'dist'),
      filename: 'index.bundle.js',
      publicPath: '/'
    },
    resolve: {
      modules: [
        path.resolve(_path, 'app'),
        'node_modules',
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
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader'
            },
          ],
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
