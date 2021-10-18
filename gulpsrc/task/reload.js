const browserSync = require('browser-sync').get('server01');

const reload = function () {
  browserSync.reload();
}

reload.displayName = 'Reload...'

module.exports = reload