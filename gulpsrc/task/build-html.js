const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');

module.exports = function () {
  return gulp
    .src('src/html/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
}