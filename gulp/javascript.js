/*jshint node:true */
'use strict';

import gulp from 'gulp';
import jspm from 'jspm';
import uglify from 'gulp-uglify';
import path from 'path';
import cache from 'gulp-cached';
import jshint from 'gulp-jshint';
import ngAnnotate from 'gulp-ng-annotate';
import del from 'del';

gulp.task('del-jsdoc', () => {
  return del([global.paths.jsdocs + '/**']);
});

gulp.task('build-js', ['build-templates'], () => {
  let dist = path.join(global.paths.dist, 'app.min.js');
  return jspm.bundleSFX(path.join(global.paths.src, 'app.js'), dist, {
      encodeNames: false
    })
    .then(() => {
      return gulp.src(dist)
        .pipe(ngAnnotate())
        .pipe(uglify({
          compress: {
            unused: false
          }
        }))
        .pipe(gulp.dest(global.paths.dist));
    });
});

// Lint JS.
gulp.task('lintjs', () => {
  return gulp.src(global.paths.js)
    .pipe(cache('lintjs'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
