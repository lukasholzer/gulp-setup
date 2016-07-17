var gulp = require('gulp');

gulp.task('build', ['clean', 'styles']);

gulp.task('default', ['build']);