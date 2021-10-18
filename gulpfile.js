// SET ENVIRONMENT
process.env.NODE_ENV = ~['build'].indexOf(process.argv[2]) ? 'production' : 'development';

const gulp = require('gulp');
const { parallel } = require('gulp');
const server = require('./gulpsrc/task/runner-server');
const watcher = require('./gulpsrc/task/runner-watcher');
const clean = require('./gulpsrc/task/runner-clean');
const html = require('./gulpsrc/task/build-html');
const styles = require('./gulpsrc/task/build-style');
const scripts = require('./gulpsrc/task/build-script');
const data = require('./gulpsrc/task/build-data');
const fonts = require('./gulpsrc/task/build-fonts');
const images = require('./gulpsrc/task/build-images');
const runServer = parallel(server, watcher);

// TASK
gulp.task('default', gulp.series(
  runServer
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