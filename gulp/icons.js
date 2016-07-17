var gulp = require('gulp'),
    config = require('./config'),
    iconfont = require('gulp-iconfont'),
    consolidate = require("gulp-consolidate"),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    runTimestamp = Math.round(Date.now() / 1000);

gulp.task('icons', function () {
    return gulp.src([config.src.icons + '/**/*.svg'])
        .pipe(iconfont({
            fontName: 'iconFont',
            prependUnicode: true,
            formats: ['woff'],
            timestamp: runTimestamp,
            normalize: true,
            fontHeight: 1001
        }))
        .on('glyphs', function(glyphs, options) {
            gulp.src(config.src.generator_templates + '/_icons.scss')
                .pipe(plumber({
                    errorHandler: notify.onError("Error: <%= error.message %>")
                }))
                .pipe(consolidate('lodash', {
                    glyphs: glyphs.map(function(glyph) {
                        // this line is needed because gulp-iconfont has changed the api from 2.0
                        return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() };
                    }),
                    fontName: 'iconFont',
                    fontPath: '../fonts/'
                }))
                .pipe(gulp.dest(config.src.scss+'/base'));
        })
        .pipe(gulp.dest(config.src.fonts))
});
