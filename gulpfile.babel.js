/* eslint-disable */
'use strict';

// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': 'src/**/!(index)*.html',
  // JS sources.
  'js': 'src/**/!(*.spec|*.protractor)*.js',
  // SASS sources.
  'sass': 'src/**/*.scss',
  // SASS base file
  'sassBase': 'src/scss/app.scss',
  // Image sources.
  'img': 'src/img',
  // Font sources.
  'font': 'src/font',
  // Sources folder.
  'src': 'src',
  // Compiled CSS.
  'common': 'src/common',
  // Distribution folder.
  'dist': 'dist',
  //Protractor specs
  'protractor': './**/*.protractor.js'
};

import gulp from 'gulp';
import requireDir from 'require-dir';
requireDir('./gulp', { recurse: false });

// Default task; start local server & watch for changes.
gulp.task('default', ['serve']);
