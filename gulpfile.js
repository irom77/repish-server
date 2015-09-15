/**
 * Created by irekromaniuk on 8/31/2015.
 * localhost:git push; gulp dev
 * repish-server:git pull; gulp copy
 * repish-PROD:gulp prod
 */

var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var preprocess = require('gulp-preprocess');
var rename = require("gulp-rename");
var run = require('gulp-run');

gulp.task('index-prod', function() {
    gulp.src('./views/index-template.ejs')
        .pipe(rename('./views/index.ejs'))
        .pipe(preprocess({context: { ENV: 'production'}})) //To set environment variables in-line
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@root'
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('index-dev', function() {
    gulp.src('./views/index-template.ejs')
        .pipe(rename('./views/index.ejs'))
        .pipe(preprocess({context: { ENV: 'development'}})) //To set environment variables in-line
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@root'
        }))
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

gulp.task('test-include', function() {
    gulp.src(['./public/javascripts/test-template.js'])
        .pipe(rename('./public/javascripts/test.js'))
        .pipe(fileinclude({
            prefix: '//@@',
            basepath: '@root',
            context: {
                ENV: 'production'
            }
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('copy', function () {
    run('cd ..; ../copy-repish-server-PROD.sh').exec();
    //run('../test.sh').exec()
});

gulp.task('dev', ['index-dev','www-dev']);
gulp.task('prod', ['index-prod','www-prod']);