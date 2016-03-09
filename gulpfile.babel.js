/*jshint node:true */
'use strict';

// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': 'app/**/!(index)*.html',
  // JS sources.
  'js': 'app/**/!(*.spec)*.js',
  // SASS sources.
  'sass': 'app/**/*.scss',
  // SASS base file
  'sassBase': 'app/scss/app.scss',
  // Image sources.
  'img': 'app/img',
  // Font sources.
  'font': 'app/font',
  // Sources folder.
  'src': 'app',
  // Compiled CSS.
  'common': 'app/common',
  // Distribution folder.
  'dist': 'dist'
};

import gulp from 'gulp';
import requireDir from 'require-dir';
requireDir('./gulp', { recurse: false });

// Default task; start local server & watch for changes.
gulp.task('default', ['serve']);
