const gulp = require('gulp');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const optionWebpack = require('../config/webpack');

module.exports = function () {
  return gulp
    .src('src/js/all.js')
    .pipe(webpack(optionWebpack))
    .pipe(uglify({
      mangle: {
        keep_fnames: true
      }
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
}