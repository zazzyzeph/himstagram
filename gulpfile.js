'use strict';

var gulp = require('gulp');
var sass = require('gulp-dart-sass');

gulp.task('sass', function () {
  return gulp.src('./scss/style.scss')
    .pipe(sass({includePaths: ['./scss/']}).on('error', sass.logError))
    .pipe(gulp.dest('static/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});