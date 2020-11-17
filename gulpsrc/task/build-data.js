const gulp = require('gulp');
const browserSync = require('browser-sync');

module.exports =  function () {
  return gulp 
    .src(['src/data/*'])
    .pipe(gulp.dest('build/data/'))
    .pipe(browserSync.stream());
}

