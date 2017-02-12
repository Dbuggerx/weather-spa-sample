/*jshint node:true */
'use strict';

import gulp from 'gulp';
import jspm from 'jspm';
import uglify from 'gulp-uglify';
import path from 'path';
import cache from 'gulp-cached';
import ngAnnotate from 'gulp-ng-annotate';
import del from 'del';
import eslint from 'gulp-eslint';

gulp.task('lint-js', () => 
  gulp.src(['src/**/*.js', '!**/templates.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('del-jsdoc', () => del([global.paths.jsdocs + '/**']));

gulp.task('build-js', ['lint-js', 'build-templates'], () => {
  const src = path.join(global.paths.src, 'app.js');
  const dist = path.join(global.paths.dist, 'app.min.js');
  const builder = new jspm.Builder(global.paths.src, './jspm.config.js');

  return builder.buildStatic('app.js', dist, {
    minify: false,
    sourceMaps: false,
    encodeNames: false
  }).then(() => {
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
