'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      connect = require('gulp-connect'),
      plumber = require('gulp-plumber'),
      livereload = require('gulp-livereload'),
      pug = require('gulp-pug');

gulp.task('serve', function() {
  connect.server({
  	root: './dist/',
  	port: 8888,
    livereload: true
  });
});


gulp.task('html', function() {
    return gulp.src('./dist/*.html')
        .pipe(gulp.dest(''))
        .pipe(connect.reload());
        
});

gulp.task('styles', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.map'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('pug', function() {
  return gulp.src('./src/pug/*.pug')
    .pipe(plumber())
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest('./dist/html/'))
    .pipe(connect.reload());
});

gulp.task('html:w', function(){
	 gulp.watch('./dist/*.html', ['html']);
});

gulp.task('css:w', function() {
    gulp.watch('./src/scss/**/*.scss', ['styles']);
});
gulp.task('default', ['css:w','serve','html:w']);

