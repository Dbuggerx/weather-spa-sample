/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const neat = require('node-neat');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

console.log('Production mode is:', isProd);

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './dist');

const plugins = [
  new StyleLintPlugin({
    configFile: '.stylelintrc',
    syntax: 'scss',
    failOnError: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    minChunks: Infinity
  }),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    title: 'Weather SPA Sample - By Danilo Cestari',
    template: 'index.ejs'
  }),
  new CopyWebpackPlugin([
    { from: 'img', to: 'assets' }
  ])
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new UglifyJSPlugin({
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
  devtool: isProd ? 'cheap-module-source-map' : 'eval',
  context: sourcePath,
  entry: {
    main: './app.ts',
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
          outputPath: 'assets/'
        }
      }
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', {
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
            includePaths: neat.includePaths.concat(path.join(path.dirname(require.resolve('mdi')), 'scss'))
          }
        }
      ]
    }, /*{
      test: /\.(js|ts)$/,
      enforce: 'pre',
      exclude: [/node_modules/, /templates.js/],
      use: {
        loader: 'ts-loader',
        options: {
        }
      }
    },*/ {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: 'ts-loader',
    }, {
      test: /\.css$/,
      use: [  
        { loader: "style-loader" },
        { loader: "css-loader" },
      ],
    }],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.ts'],
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
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
    }
  }
};