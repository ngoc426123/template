const del = require('del');
const { build } = require('../config/names');

const clean = function () {
  return del(build);
}

clean.displayName = `Runner: clean`;

module.exports = clean