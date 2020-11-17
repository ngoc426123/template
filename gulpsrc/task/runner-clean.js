const gulp = require('gulp');
const del = require('del');

module.exports = function () {
  return del('build/');
}