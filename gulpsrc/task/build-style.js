const gulp = require('gulp');
const sass = require('gulp-sass');
const bulkSass = require('gulp-sass-bulk-import');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

module.exports = function () {
  return gulp
    .src('src/scss/app.scss')
    .pipe(bulkSass())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
}