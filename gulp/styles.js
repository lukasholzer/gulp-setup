'use strict';

var gulp = require('gulp'),
    config = require('./config'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    globbing = require('gulp-css-globbing'),
    autoprefixer = require('gulp-autoprefixer'),
    cssimport = require('gulp-cssimport'),
    base64 = require('gulp-base64'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    util = require('gulp-util'),
    gulpif = require('gulp-if'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync');


function styles(debug) {
    var isProduction = !debug;

    return gulp.src([config.src.scss + '/**/*.{sass,scss}', '!' + config.src.scss + '/fonts.scss'])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(globbing({
            extensions: ['.scss']
        }))
        .pipe(gulpif(!isProduction, sourcemaps.init()))
        .pipe(sass({
            outputStyle: isProduction ? 'compressed' : 'expanded'
        }))
        .pipe(cssimport({}))
        .pipe(autoprefixer({
            browsers: config.browsers
        }))
        .pipe(gulpif(!isProduction, sourcemaps.write()))
        .pipe(gulp.dest(config.dest.css))
        .pipe(size({
            title: "Styles:"
        }))
        .pipe(browserSync.stream());
}

gulp.task('styles:fonts', ['icons'], function() {
    return gulp.src(config.src.scss + '/fonts.scss')
        .pipe(base64({
            baseDir: __dirname + '/../',
            extensions: [/\.woff$/i],
            maxImageSize: 8000 * 1024,
            debug: true
        }))
        .pipe(rename('fonts.css'))
        .pipe(gulp.dest(config.dest.css))
        .pipe(browserSync.stream());
});

gulp.task('styles:prod', ['styles:fonts'], function () {
    return styles(false);
});

gulp.task('styles', ['styles:fonts'], function () {
    return styles(true);
});