var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack', function() {
  return gulp.src('./src/**/*.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['webpack']);
