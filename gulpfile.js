/**
 * Created by irekromaniuk on 8/31/2015.
 */
var gulp = require('gulp');

var preprocess = require('gulp-preprocess');
var rename = require("gulp-rename");

gulp.task('index-prod', function() {
    gulp.src('./views/index-template.ejs')
        .pipe(rename('./views/index.ejs'))
        .pipe(preprocess({context: { ENV: 'production'}})) //To set environment variables in-line
        .pipe(gulp.dest('./'))
});

gulp.task('index-dev', function() {
    gulp.src('./views/index-template.ejs')
        .pipe(rename('./views/index.ejs'))
        .pipe(preprocess({context: { ENV: 'development'}})) //To set environment variables in-line
        .pipe(gulp.dest('./'))
});

gulp.task('www-prod', function() {
    gulp.src(['./bin/www-template.js'])
        .pipe(rename('./bin/www.js'))
        .pipe(preprocess({context: {ENV: 'production'}}))
        .pipe(gulp.dest('./'))
});

gulp.task('www-dev', function() {
    gulp.src(['./bin/www-template.js'])
        .pipe(rename('./bin/www.js'))
        .pipe(preprocess({context: {ENV: 'development'}}))
        .pipe(gulp.dest('./'))
});


gulp.task('dev', ['index-dev','www-dev']);
gulp.task('prod', ['index-prod','www-prod']);