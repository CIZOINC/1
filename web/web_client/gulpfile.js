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
var replace = require('gulp-replace');
var htmlmin = require('gulp-html-minifier');
var runSequence = require('run-sequence');

var thirdPartyJS = [
    '../node_modules/angular/angular.js',
    '../node_modules/jquery/dist/jquery.js',
    '../node_modules/bootstrap/dist/js/bootstrap.js',
    '../node_modules/angular-ui-router/release/angular-ui-router.js',
    '../node_modules/angular-sanitize/angular-sanitize.js',
    '../node_modules/moment/moment.js',
    '../node_modules/lodash/lodash.js',
    '../node_modules/angularjs-slider/dist/rzslider.js',
    '../node_modules/angular-svg-round-progressbar/build/roundProgress.js'
];
var thirdPartyCSS = [
    '../node_modules/angular/angular-csp.css',
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    '../node_modules/angularjs-slider/dist/rzslider.css'
];


gulp.task('Index_files_gathering', function () {
    "use strict";
    gulp.src('./index.html')
        .pipe(inject(gulp.src( thirdPartyCSS.concat(thirdPartyJS), {read: false}), {name: 'third_party', addRootSlash: false}))
        .pipe(inject(gulp.src([
            './**/*.css',
            '!./temp/**/*.*'
        ], {read: false}), {name: 'css_common', addRootSlash: false}))
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
    return gulp.src([
        './**/*.less',
        '../node_modules/angularjs-slider/src/rzslider.less'
    ])
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
            '!gulpfile.js',
            '!AppCtrl.js'
        ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./temp'));
});

gulp.task('compile_appctrl_staging', function () {
    "use strict";
    return gulp.src(['AppCtrl.js'])
        .pipe(replace("facebookAppId: '459923084193687'", "facebookAppId: '459923084193687'"))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./temp'));
});

gulp.task('compile_appctrl_production', function () {
    "use strict";
    return gulp.src(['AppCtrl.js'])
        .pipe(replace("facebookAppId: '459923084193687'", "facebookAppId: '459778204208175'"))
        .pipe(replace("hostName: `https://staging.cizo.com`", "hostName: `https://api.cizo.com`"))
        .pipe(replace("sharingPath: 'https://staging.cizo.com/app'", "sharingPath: 'https://www.cizo.com/'"))
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
            './temp/**/*.js',
            '!./temp/final/**/*.js'
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

gulp.task('copy_icon-fonts', function () {
    "use strict";
    return gulp.src([
        'font/**/*.*'
    ])
        .pipe(gulp.dest('./temp/final/font'));
});

gulp.task('copy_dependencies', function () {
    "use strict";
    return gulp.src([
            './images/iconVideoPlay.svg',
            './images/iconVideoPause.svg',
            './images/iconVideoPlayIntermission.svg',
            './images/bgTbnVideo.svg',
            './images/logo.svg'
        ])
        .pipe(gulp.dest('./temp/final/images'));
});

gulp.task('copy_index_template', function () {
    "use strict";
    var postfix = Math.round(Math.random() * 100000000) ;

    return gulp.src(['./index_template.html'])
        .pipe(rename('index.html'))
        .pipe(replace('all.min.css', 'all.min.css?' + postfix))
        .pipe(replace('3d-party.min.js', '3d-party.min.js?' + postfix))
        .pipe(replace('ng.min.js', 'ng.min.js?' + postfix))
        .pipe(gulp.dest('./temp/final'));
});

gulp.task('copy_index_template_staging', function () {
    "use strict";
    var postfix = Math.round(Math.random() * 100000000) ;

    return gulp.src(['./index_template.html'])
        .pipe(rename('index.html'))
        .pipe(replace('all.min.css', 'all.min.css?' + postfix))
        .pipe(replace('3d-party.min.js', '3d-party.min.js?' + postfix))
        .pipe(replace('ng.min.js', 'ng.min.js?' + postfix))
        .pipe(replace('UA-XXXXX-Y', 'UA-74526766-3'))
        .pipe(gulp.dest('./temp/final'));
});

gulp.task('copy_index_template_production', function () {
    "use strict";
    var postfix = Math.round(Math.random() * 100000000) ;

    return gulp.src(['./index_template.html'])
        .pipe(rename('index.html'))
        .pipe(replace('all.min.css', 'all.min.css?' + postfix))
        .pipe(replace('3d-party.min.js', '3d-party.min.js?' + postfix))
        .pipe(replace('ng.min.js', 'ng.min.js?' + postfix))
        .pipe(replace('UA-XXXXX-Y', 'UA-74526766-2'))
        .pipe(gulp.dest('./temp/final'));
});

gulp.task('send_to_ror', function () {
    gulp.src([
        './temp/final/**/*.*',
        '!./temp/final/**/*.map'
    ]).pipe(gulp.dest('../../ror/public/web_client'));
});

gulp.task('send_to_staging', function () {
    gulp.src([
        './temp/final/**/*.*',
        '!./temp/final/**/*.map'
    ]).pipe(gulp.dest('../../ror/public/web_client/staging'));
});

gulp.task('send_to_production', function () {
    gulp.src([
        './temp/final/**/*.*',
        '!./temp/final/**/*.map'
    ]).pipe(gulp.dest('../../ror/public/web_client/production'));
});

gulp.task('clean_temp', function () {
    rimraf('./temp');
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
            'copy_icon-fonts',
            'copy_bootstrap_fonts',
            'copy_index_template'
        ],
        'send_to_ror');
});


gulp.task('build-staging', function (cb) {
    "use strict";
    runSequence('clean_temp',
        [
            'collect_css',
            'collect_html',
            'compile_js',
            'compile_appctrl_staging'
        ],
        [
            'minify_ng_js',
            'minify_third_party_js',
            'minify_css',
            'copy_dependencies',
            'copy_icon-fonts',
            'copy_bootstrap_fonts',
            'copy_index_template_staging'
        ],
        'send_to_staging', cb);
});

gulp.task('build-production', function (cb) {
    "use strict";
    runSequence('clean_temp',
        [
            'collect_css',
            'collect_html',
            'compile_js',
            'compile_appctrl_production'
        ],
        [
            'minify_ng_js',
            'minify_third_party_js',
            'minify_css',
            'copy_dependencies',
            'copy_icon-fonts',
            'copy_bootstrap_fonts',
            'copy_index_template_production'
        ],
        'send_to_production', cb);
});

gulp.task('build-all', function (cb) {
    runSequence('build-staging', 'build-production', cb)
});