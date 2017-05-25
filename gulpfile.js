var gulp = require('gulp');
var webserver = require('gulp-webserver');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack', function() {
  return gulp.src('./src/**/*.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('./dist'));
});

gulp.task('serve', function(){
  gulp.src('./')
    .pipe(webserver({
      livereload: false,
      port: 7777,
      host: '0.0.0.0'
    }));
});

gulp.task('build', ['webpack']);
gulp.task('start', ['build', 'serve']);
