/*jshint node:true */
'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import util from 'gulp-util';
import path from 'path';
import historyApiFallback from 'connect-history-api-fallback';
const bs = browserSync.create();

function onChange(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}

gulp.task('reload', done => {
  bs.reload();
  done();
});

gulp.task('serve', ['sass', 'templates'], () => {
  bs.init({
    port: process.env.PORT || 3000,
    open: true,
    startPath: global.paths.src,
    server: {
      directory: false,
      baseDir: ['./', global.paths.src],
      middleware: [historyApiFallback()],
      routes: {
        "jspm_packages": './jspm_packages'
      }
    }
  });

  gulp.watch([global.paths.js], ['lintjs', 'reload']).on('change', onChange);
  gulp.watch([global.paths.html], ['templates', 'reload']).on('change', onChange);
  gulp.watch('**/*.scss', ['sass']).on('change', onChange);
  gulp.watch([path.join(global.paths.src, 'app.css')], ['reload']).on('change', onChange);
  gulp.watch([global.paths.html, path.join(global.paths.src, 'index.html')], ['reload']).on('change', onChange);
});

gulp.task('serve:dist', ['build'], done => {
  bs.init({
    port: process.env.PORT || 3000,
    open: true,
    server: {
      baseDir: global.paths.dist,
      middleware: [historyApiFallback()]
    }
  });
  done();
});
