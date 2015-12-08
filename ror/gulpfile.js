var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('index_files_gathering', function () {
    var target = gulp.src('./web_client/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/angular/angular.js',
        './web_client/**/*-compiled.js',

        './node_modules/angular/angular-csp.css',
        './node_modules/bootstrap/dist/css/bootstrap.css'
    ], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./web_client'));
});