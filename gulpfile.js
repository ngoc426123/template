const gulp = require('gulp');

const clean = require(`./gulpsrc/task/runner-clean.js`);
const watch = require(`./gulpsrc/task/runner-watch.js`);

const html = require(`./gulpsrc/task/build-html.js`);
const style = require(`./gulpsrc/task/build-style.js`);
const script = require(`./gulpsrc/task/build-script.js`);
const data = require(`./gulpsrc/task/build-data.js`);
const fonts = require(`./gulpsrc/task/build-fonts.js`);
const images = require(`./gulpsrc/task/build-images.js`);

gulp.task('default', gulp.series(html, style, script, fonts, images, data, watch));

gulp.task('build', gulp.series(clean, html, style, script, fonts, images, data));