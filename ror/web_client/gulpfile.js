var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');

gulp.task('index_files_gathering', function () {
    "use strict";
    gulp.src('./index.html')
        .pipe(inject(gulp.src([
            '../node_modules/angular/angular-csp.css',
            '../node_modules/bootstrap/dist/css/bootstrap.css',
            '../node_modules/angular/angular.js',
            '../node_modules/jquery/dist/jquery.js',
            '../node_modules/bootstrap/dist/js/bootstrap.js',
            '../node_modules/ui-router/release/angular-ui-router.js',
            '../node_modules/angular-sanitize/angular-sanitize.js',
            '../node_modules/moment/moment.js'
        ], {read: false}), {name: 'third_party', addRootSlash: false}))
        .pipe(inject(gulp.src([
            './**/*.css'
        ], {read: false}), {name: 'css_common', addRootSlash: false}))
        .pipe(inject(gulp.src([
            '!gulpfile*.js',
            './**/*-compiled.js'

        ])
            .pipe(angularFilesort()), {addRootSlash: false}))
        .pipe(gulp.dest('.'));
});