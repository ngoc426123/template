const gulp = require('gulp');
const { parallel } = require('gulp');
const viewer = require('./gulpsrc/task/runner-viewer');
const clean = require('./gulpsrc/task/runner-clean');
const watch = require('./gulpsrc/task/runner-watch');
const html = require('./gulpsrc/task/build-html');
const styles = require('./gulpsrc/task/build-style');
const scripts = require('./gulpsrc/task/build-script');
const data = require('./gulpsrc/task/build-data');
const fonts = require('./gulpsrc/task/build-fonts');
const images = require('./gulpsrc/task/build-images');
const runViewer = parallel(viewer, watch);

// SET ENVIRONMENT
process.env.NODE_ENV = ~['build'].indexOf(process.argv[2]) ? 'production' : 'development';

// TASK
gulp.task('default', gulp.series(
  clean,
  styles,
  scripts,
  fonts,
  images,
  data,
  runViewer
));
gulp.task('build', gulp.series(
  clean,
  html,
  styles,
  scripts,
  fonts,
  images,
  data
));