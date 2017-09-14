// Final build / production config will go here..
'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const EslintFormatter = require('react-dev-utils/eslintFormatter');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

const _paths = require('./paths');

let pathsToClean = [
  _paths.appBuild
];

let cleanOptions = {
  verbose: true,
  dry: false
};

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

// Warn and crash if required files are missing
if (!checkRequiredFiles([_paths.appIndexHtml, _paths.appIndexJs])) {
  process.exit(1);
}

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = function () {
  return {
    bail: true,
    devtool: 'source-map',
    entry: [require.resolve('./polyfills.js'), _paths.appIndexJs],
    output: {
      path: _paths.appBuild,
      filename: 'static/js/[name].[chunkhash:8].js',
      publicPath: '/'
    },
    resolve: {
      modules: [
        _paths.appSrc,
        _paths.appNodeModules
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
            formatter: EslintFormatter
          }
        },
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.css$/,
            /\.(scss|sass)$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/
          ],
          loader: require.resolve('file-loader'),
          options: {
            name: '[path][name].[ext]?[hash]'
          }
        },
        // "url" loader works like "file" loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: '[path][name].[ext]?[hash]'
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: require.resolve('babel-loader')
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          use: extractSass.extract({
            use: [{
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            }, {
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
                      'not ie < 9' // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009'
                  })
                ],
                sourceMap: true
              }
            }, {
              loader: require.resolve('sass-loader'),
              options: {
                sourceMap: true
              }
            }, {
              loader: require.resolve('sasslint-loader')
            }],
            // use style-loader in development
            fallback: "style-loader"
          })
        }
      ]
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin({
        inject: true,
        template: _paths.appIndexHtml,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      extractSass,
      new CleanWebpackPlugin(pathsToClean, cleanOptions)
    ]
  };
};
