/*jshint node:true */
'use strict';

import gulp from 'gulp';
import runSeq from 'run-sequence';
import del from 'del';
import path from 'path';

// Empty the build dir.
gulp.task('clean', done => {
  del([global.paths.dist + '/*']).then(() => done());
});

// One build task to rule them all!
gulp.task('build', done => {
  runSeq('clean', ['build-css', 'build-html', 'build-js', 'build-assets'], done);
});
