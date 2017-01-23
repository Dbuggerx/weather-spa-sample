const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

console.log('Production is:', isProd);

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './dist');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    minChunks: Infinity
  }),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    title: 'TEST!!!',
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
  devtool: isProd ? 'source-map' : 'eval',
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
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
      staticsPath
    ]
  },
  plugins,
  devServer: {
    contentBase: sourcePath,
    historyApiFallback: true,
    port: 3000,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
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
    },
  }
};