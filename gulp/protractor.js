/*jshint node:true */
'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import protractor from 'gulp-angular-protractor';
const bs = browserSync.create();

gulp.task('protractor', ['build'], done => {
  bs.init({
    port: process.env.PORT || 3000,
    open: false,
    server: {
      baseDir: global.paths.dist,
      middleware: [historyApiFallback()]
    }
  }, () => {
    gulp.src(global.paths.protractor)
      .pipe(protractor({
        'configFile': 'protractor.config.js',
        'args': ['--baseUrl', 'http://127.0.0.1:8000'],
        'autoStartStopServer': true,
        'debug': false
      }))
      .on('error', err => {
        bs.exit();
        done();
        throw err;
      })
      .on('end', () => {
        bs.exit();
        done();
      });
  });
});
