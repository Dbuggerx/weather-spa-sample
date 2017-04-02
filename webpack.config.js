/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const bourbon = require('bourbon');
const neat = require('bourbon-neat');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

console.log('Production mode is:', isProd);

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './dist');

const plugins = [
  new StyleLintPlugin({
    configFile: '.stylelintrc',
    syntax: 'scss'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    minChunks: Infinity
  }),
  new CopyWebpackPlugin([
    { from: 'img', to: 'img' }
  ]),
  new ExtractTextPlugin('styles.css'),
  new webpack.EnvironmentPlugin({
    NODE_ENV: nodeEnv
  }),
  new HtmlWebpackPlugin({
    title: 'Weather SPA Sample - By Danilo Cestari',
    template: 'index.ejs'
  })
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = {
  devtool: isProd ? 'nosources-source-map' : 'source-map',
  context: sourcePath,
  entry: {
    main: './app.js',
    vendor: ['angular', 'angular-resource', 'angular-ui-router', 'jquery', 'moment']
  },
  output: {
    path: staticsPath,
    filename: '[hash].[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.json$/,
      use: 'json-loader'
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }]
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 25000,
          outputPath: 'assets/',
          publicPath: 'assets/'
        }
      }
    }, {
      test: /\.s?css$/,
      use: ExtractTextPlugin.extract({
        use: [{
            loader: 'css-loader',
            options: {
                sourceMap: !isProd
            }
          }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: !isProd,
            includePaths: bourbon.includePaths.concat(
              neat.includePaths,
              path.join(path.dirname(require.resolve('mdi')), 'scss'))
          }
        }]
      })
    }, {
      test: /\.js$/,
      enforce: 'pre',
      exclude: [/node_modules/, /templates.js/],
      use: {
        loader: 'eslint-loader',
        options: {
          emitError: true,
          emitWarning: true,
          failOnWarning: true,
          failOnError: true
        }
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ]
  },
  plugins,
  devServer: {
    contentBase: sourcePath,
    watchContentBase: true,
    historyApiFallback: true,
    port: 3000,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
    open: false,
    stats: 'normal'
  }
};
