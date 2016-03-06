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

// Copy font files to distribution.
gulp.task('copy-font', () =>
  gulp.src(path.join(global.paths.font, '*.*'))
    .pipe(gulp.dest(path.join(global.paths.dist, 'font')))
);

// Copy favicons files to distribution.
gulp.task('copy-favicon', () =>
  gulp.src(path.join(global.paths.img, 'favicon/*.*'))
    .pipe(gulp.dest(global.paths.dist))
);

// Build assets for distribution.
gulp.task('build-assets', done => {
  runSeq('clean', ['minify-svg', 'copy-font', 'copy-favicon'], done);
});
