const gulp = require('gulp');
const browserSync = require('browser-sync');

module.exports = function () {
  return gulp 
    .src(['src/images/**'])
    .pipe(gulp.dest('build/images/'))
    .pipe(browserSync.stream());
}
