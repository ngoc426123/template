const { DEV_PORT, STATIC_PORT, UI_PORT } = require('../config/port');
const gulp = require('gulp');
const style = require(`./build-style.js`);
const script = require(`./build-script.js`);
const browserSync = require('browser-sync').create('server01');
const reload = require('./reload');

const watcher = function () {
  browserSync.watch('src/html/*').on('change', reload);
  browserSync.watch('src/html/*').on('change', reload);

  browserSync.init({
    port: DEV_PORT,
    proxy: `http://localhost:${STATIC_PORT}`,
    ui: {
      port: UI_PORT
    },
  });

  // gulp.watch('src/scss/*', gulp.series(style, reload));
  // gulp.watch('src/scss/**/*', gulp.series(style, reload));
  // gulp.watch('src/js/*', gulp.series(script, reload));
  // gulp.watch('src/js/**/*', gulp.series(script, reload));
}

watcher.displayName = 'Runner: watcher';

module.exports = watcher;