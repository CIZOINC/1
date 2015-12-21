var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var templateCache = require('gulp-angular-templatecache');

gulp.task('index_files_gathering', function () {
    "use strict";
    gulp.src([
            '!index.html',
            './**/*.html'
        ])
        .pipe(templateCache())
        .pipe(gulp.dest('common'));

    gulp.src('./index.html')
        .pipe(inject(gulp.src([
            '../node_modules/angular/angular-csp.css',
            '../node_modules/bootstrap/dist/css/bootstrap.css',
            '../node_modules/angular/angular.js',
            '../node_modules/jquery/dist/jquery.js',
            '../node_modules/bootstrap/dist/js/bootstrap.js',
            '../node_modules/ui-router/release/angular-ui-router.js',
            '../node_modules/angular-sanitize/angular-sanitize.js',
            '../node_modules/lodash/index.js',
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

gulp.task('build_package', function () {
        //minify libs
    gulp.src([
            '../node_modules/angular/angular.js',
            '../node_modules/jquery/dist/jquery.js',
            '../node_modules/bootstrap/dist/js/bootstrap.js',
            '../node_modules/ui-router/release/angular-ui-router.js',
            '../node_modules/angular-sanitize/angular-sanitize.js',
            '../node_modules/lodash/index.js',
            '../node_modules/moment/moment.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js', {newLine: ';'}))
        .pipe(uglify({mangle: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../public/apanel'));

        //minify angular files
    gulp.src([
            '!gulpfile*.js',
            './**/*-compiled.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('all-ng.min.js'))
        .pipe(ngAnnotate({
            //add: true
         }))
        .pipe(uglify({mangle: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../public/apanel'));

        //minify css
    gulp.src([
            '../node_modules/angular/angular-csp.css',
            '../node_modules/bootstrap/dist/css/bootstrap.css',
            './**/*.css'
        ])
        .pipe(concat('all.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('../public/apanel/css'));
    gulp.src(['../node_modules/bootstrap/fonts/**.*'])
        .pipe(gulp.dest('../public/apanel/fonts'));
    gulp.src([
        '**/*.json',
        'fonts/**/*.*',
        '**/*.svg'
    ])
        .pipe(gulp.dest('../public/apanel'));
});

gulp.task('send_to_ror', function () {
    gulp.src([
        '../public/apanel/**/*.*',
        '!../public/apanel/**/*.map'
    ]).pipe(gulp.dest('../../ror/public/admin_panel'));
});