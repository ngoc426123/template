const gulp = require('gulp');
const browserSync = require('browser-sync');

module.exports = function () {
  return gulp 
    .src(['node_modules/@fortawesome/fontawesome-free/webfonts/*', 'src/fonts/**'])
    .pipe(gulp.dest('build/fonts/'))
    .pipe(browserSync.stream());
}