const path = require('path');
const sourcePath = path.join(__dirname, './src');

// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-jasmine
      // Set framework to jasmine
      'jasmine'
    ],

    reporters: ['spec'],
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true // do not print information about skipped tests
    },

    files: [
      { pattern: 'node_modules/babel-polyfill/dist/polyfill.js', watched: false },
      'tests.webpack.js'
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'tests.webpack.js': ['webpack', 'sourcemap'],
      // 'src/home/**/!(*.config|*.module|*.spec|*.protractor)*.js': ['coverage']
    },

    browsers: [
      // Run tests using PhantomJS
      'PhantomJS'
    ],

    singleRun: true,

    webpack: {
      devtool: 'inline-source-map',
      context: sourcePath,
      module: {
        rules: [{
           test: /(\.css|\.scss)$/,
           loader: 'ignore-loader'
         },{
          test: /.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader'
          }],
        }]
      },
      resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
        modules: [
          path.resolve(__dirname, 'node_modules'),
          sourcePath
        ]
      }
    },

    // Hide webpack build information from output
    webpackMiddleware: {
      stats: 'errors-only'
    },

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO

  });
};