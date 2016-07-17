var gulp = require('gulp'),
    config = require('./config'),
    del = require('del');

gulp.task('clean', function() {
    del.sync([config.dest.public]);
});
