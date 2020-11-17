const gulp = require('gulp');
// PUG
const pug = require('gulp-pug');
// SASS
const sass = require('gulp-sass');
const bulkSass = require('gulp-sass-bulk-import');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
// JS
const uglify = require('gulp-uglify');
// WEBPACK
const webpack = require('webpack-stream');
const { ProvidePlugin } = require('webpack');
const { resolve } = require('path');
const optionWebpack = {
  mode: 'none',
  output:{
    filename : 'app.min.js'
  },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Plugin: ['@/core', 'default']
    })
  ],
  resolve: {
    alias: {
      '@': resolve('./src/js/_init/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
          ],
          cacheDirectory: true
        }
      }
    ]
  }
};
// BROWER SYNC
const browserSync = require('browser-sync');
// DEL
const del = require('del');

gulp.task('clean', function() {
  return del('build/');
})

gulp.task('html', function() {
  return gulp
    .src('src/html/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp
    .src('src/scss/app.scss')
    .pipe(bulkSass())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
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
});

gulp.task('font', function() {
  return gulp 
    .src(['node_modules/@fortawesome/fontawesome-free/webfonts/*', 'src/fonts/**'])
    .pipe(gulp.dest('build/fonts/'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp 
    .src(['src/images/**'])
    .pipe(gulp.dest('build/images/'))
    .pipe(browserSync.stream());
});

gulp.task('data', function() {
  return gulp 
    .src(['src/data/*'])
    .pipe(gulp.dest('build/data/'))
    .pipe(browserSync.stream());
});

gulp.task('watch',function(){
  browserSync.init({
    server:{
      baseDir : './build/'
    }
  });

  gulp.watch('src/scss/*', gulp.series('sass'))
  gulp.watch('src/scss/**/*', gulp.series('sass'))
  gulp.watch('src/js/*', gulp.series('js'))
  gulp.watch('src/js/**/*', gulp.series('js'))
  gulp.watch('src/html/*', gulp.series('html'))
  gulp.watch('src/html/**/*', gulp.series('html'))
  gulp.watch('src/data/*', gulp.series('html'))
});

gulp.task('default', gulp.series('html', 'sass', 'js', 'font','images', 'data', 'watch'));

gulp.task('build', gulp.series('clean', 'html', 'sass', 'js', 'font','images', 'data'))