// Will move the default local dev configs here..
'use strict';
const path = require('path');
const _paths = require('./paths');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const WebpackDashboardPlugin = require('webpack-dashboard/plugin');
const EslintFormatter = require('react-dev-utils/eslintFormatter');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

module.exports = function (_path) {
  return {
    // Don't attempt to continue if there are any errors.
    bail: true,
    devtool: 'cheap-module-source-map',
    entry: _paths.appIndexJs,
    output: {
      path: _paths.appBuild,
      filename: 'index.bundle.js?[hash:8]',
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
        // ** ADDING/UPDATING LOADERS **
        // The "file" loader handles all assets unless explicitly excluded.
        // The `exclude` list *must* be updated with every change to loader extensions.
        // When adding a new loader, you must add its `test`
        // as a new entry in the `exclude` list for "file" loader.

        // "file" loader makes sure those assets get served by WebpackDevServer.
        // When you `import` an asset, you get its (virtual) filename.
        // In production, they would get copied to the `build` folder.
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
          use: [
            {
              loader: require.resolve('style-loader')
            },
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                sourceMap: true
              }
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
                      'not ie < 9' // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009'
                  })
                ],
                sourceMap: true
              }
            },
            {
              loader: require.resolve('sass-loader'),
              options: {
                sourceMap: true
              }
            },
            {
              loader: require.resolve('sasslint-loader')
            }
          ]
        }
      ]
    },
    devServer: {
      // WebpackDevServer is noisy by default so we emit custom message instead
      // by listening to the compiler events with `compiler.plugin` calls above.
      quiet: true,
      // Reportedly, this avoids CPU overload on some systems.
      // https://github.com/facebookincubator/create-react-app/issues/293
      watchOptions: {
        ignored: /node_modules/,
      },
      // Enable HTTPS if the HTTPS environment variable is set to 'true'
      https: protocol === 'https',
      historyApiFallback: true,
      hot: true
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   "process.env.PRODUCTION": JSON.stringify(PRODUCTION),
      //   "proccess.env.DEVELOPMENT": JSON.stringify(DEVELOPMENT),
      // }),
      new HtmlWebpackPlugin({
        template: './app/index.html'
      }),
      new FlowBabelWebpackPlugin(),
      new WebpackDashboardPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
