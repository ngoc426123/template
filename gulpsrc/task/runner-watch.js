const gulp = require('gulp');
const reload = require('./reload');
const style = require(`./build-style.js`);
const script = require(`./build-script.js`);
const data = require(`./build-data.js`);

const watch = function () {
  gulp.watch('src/scss/*', gulp.series(style));
  gulp.watch('src/scss/**/*', gulp.series(style));
  gulp.watch('src/js/*', gulp.series(script));
  gulp.watch('src/js/**/*', gulp.series(script));
  gulp.watch('src/data/*', gulp.series(data));
  gulp.watch('src/html/*', reload);
  gulp.watch('src/html/**/*', reload);
}

watch.displayName = `Runner: watch`;

module.exports = watch;