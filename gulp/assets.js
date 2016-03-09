/*jshint node:true */
'use strict';

import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import path from 'path';
import del from 'del';
import runSeq from 'run-sequence';

gulp.task('clean', done => {
  del([global.paths.img + '/*']).then(() => done());
});

// Minify and copy SVGs to distribution.
gulp.task('minify-svg', () =>
  gulp.src(path.join(global.paths.img, '*.svg'))
    .pipe(svgmin())
    .pipe(gulp.dest(path.join(global.paths.dist, 'img')))
);

// Build assets for distribution.
gulp.task('build-assets', done => {
  runSeq('clean', ['minify-svg'], done);
});
