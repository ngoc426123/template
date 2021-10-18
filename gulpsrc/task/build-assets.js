const { series } = require('gulp');
const styles = require('./build-style');
const scripts = require('./build-script');
const data = require('./build-data');
const fonts = require('./build-fonts');
const images = require('./build-images');

const buildAssets = series(
  styles,
  scripts,
  data,
  fonts,
  images
);

module.exports = buildAssets;