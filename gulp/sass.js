/*jshint node:true */
'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcssAssets from 'postcss-assets';
import postcssCopy from 'postcss-copy';
import autoprefixer from 'autoprefixer';
import minifyCss from 'gulp-cssnano';
import del from 'del';
import path from 'path';
import concat from 'gulp-concat';
import neat from 'node-neat';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: neat.includePaths
};

gulp.task('sass', () => {
  return gulp.src(global.paths.sassBase)
    .pipe(rename('app.css'))
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss([autoprefixer(),
      postcssImport({
        transform(content){
          return content.replace(/url\((?!.?data)/g, 'resolve(');
        }
      }),
      postcssAssets({
        basePath: '.',
        relativeTo: global.paths.src,
        loadPaths: [global.paths.img]
      })
    ]))
    .pipe(gulp.dest(global.paths.src));
});

// Clear the assets dir.
gulp.task('clean-assets', done => {
  del([global.paths.dist + '/assets']).then(() => done());
});

gulp.task('build-css', ['clean-assets', 'sass'], () => {
  return gulp.src(path.join(global.paths.src, 'app.css'))
    .pipe(postcss([postcssCopy({
      src: ['.'],
      dest: global.paths.dist,
      template: 'assets/[name].[ext]',
      keepRelativePath: false
    })], {
      to: path.join(global.paths.dist, 'app.min.css')
    }))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(global.paths.dist));
});
