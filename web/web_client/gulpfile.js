var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var templateCache = require('gulp-angular-templatecache');
var less = require('gulp-less');
var babel = require('gulp-babel');
var rimraf = require('gulp-rimraf');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var thirdPartyJS = [
    '../node_modules/angular/angular.js',
    '../node_modules/jquery/dist/jquery.js',
    '../node_modules/bootstrap/dist/js/bootstrap.js',
    '../node_modules/ui-router/release/angular-ui-router.js',
    '../node_modules/angular-sanitize/angular-sanitize.js',
    '../node_modules/moment/moment.js'
];
var thirdPartyCSS = [
    '../node_modules/angular/angular-csp.css',
    '../node_modules/bootstrap/dist/css/bootstrap.css'
];


gulp.task('Index_files_gathering', function () {
    "use strict";
    gulp.src('./index.html')
        .pipe(inject(gulp.src( thirdPartyCSS.concat(thirdPartyJS), {read: false}), {name: 'third_party', addRootSlash: false}))
        .pipe(inject(gulp.src(['./**/*.css'], {read: false}), {name: 'css_common', addRootSlash: false}))
        .pipe(inject(gulp.src([
            '!gulpfile*.js',
            '!./temp/**/*.*',
            './**/*-compiled.js'
        ])
        .pipe(angularFilesort()), {addRootSlash: false}))
        .pipe(gulp.dest('.'));
    gulp.src([
            '!index.html',
            '!./temp/**/*.*',
            './**/*.html'
        ])
        .pipe(templateCache())
        .pipe(gulp.dest('common'));
});

gulp.task('collect_css', function () {
    "use strict";
    return gulp.src([ './**/*.less' ])
        .pipe(less())
        .pipe(gulp.dest('./temp'));
});

gulp.task('collect_html', function () {
    "use strict";
    gulp.src([
            '!index.html',
            './**/*.html'
        ])
        .pipe(templateCache())
        .pipe(gulp.dest('common'));
});

gulp.task('compile_js', function () {
    "use strict";
    return gulp.src([
            './**/*.js',
            '!./**/*-compiled.js',
            '!./temp/**/*.*',
            '!gulpfile.js'
        ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./temp'));
});

gulp.task('minify_third_party_js', function () {
    "use strict";
    return gulp.src(thirdPartyJS)
        .pipe(sourcemaps.init())
        .pipe(concat('3d-party.min.js', {newLine: ';'}))
        .pipe(uglify({mangle: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./temp/final'));
});

gulp.task('minify_ng_js', function () {
    "use strict";
    return gulp.src([
            './temp/**/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('ng.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({mangle: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./temp/final'));
});

gulp.task('minify_css', function () {
    "use strict";
    return gulp.src([
            '../node_modules/angular/angular-csp.css',
            '../node_modules/bootstrap/dist/css/bootstrap.css',
            './temp/**/*.css'
        ])
        .pipe(concat('all.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./temp/final'));
});

gulp.task('copy_bootstrap_fonts', function () {
    "use strict";
    return gulp.src(['../node_modules/bootstrap/fonts/**.*'])
        .pipe(gulp.dest('./temp/final/fonts'));
});

gulp.task('copy_dependencies', function () {
    "use strict";
    return gulp.src([
            'fonts/**/*.*',
            './images/**/*.svg'
        ])
        .pipe(gulp.dest('./temp/final/images'));
});

gulp.task('copy_index_template', function () {
    "use strict";
    return gulp.src(['./index_template.html'])
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./temp/final'));
});

gulp.task('send_to_ror', function () {
    gulp.src([
        './temp/final/**/*.*',
        '!./temp/final/**/*.map'
    ]).pipe(gulp.dest('../../ror/public/web_client'));
});

gulp.task('clean_temp', function () {
    gulp.src([
        './temp'
    ]).pipe(rimraf());
});

gulp.task('default', function () {
    "use strict";
    runSequence('clean_temp',
        [
            'collect_css',
            'collect_html',
            'compile_js'
        ],
        [
            'minify_ng_js',
            'minify_third_party_js',
            'minify_css',
            'copy_dependencies',
            'copy_bootstrap_fonts',
            'copy_index_template'
        ],
        'send_to_ror');
});