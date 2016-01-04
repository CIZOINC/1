'use strict';

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

    gulp.src('./index.html').pipe(inject(gulp.src(['../node_modules/angular/angular-csp.css', '../node_modules/bootstrap/dist/css/bootstrap.css', '../node_modules/angular/angular.js', '../node_modules/jquery/dist/jquery.js', '../node_modules/bootstrap/dist/js/bootstrap.js', '../node_modules/ui-router/release/angular-ui-router.js', '../node_modules/angular-sanitize/angular-sanitize.js', '../node_modules/moment/moment.js'], { read: false }), { name: 'third_party', addRootSlash: false })).pipe(inject(gulp.src(['./**/*.css'], { read: false }), { name: 'css_common', addRootSlash: false })).pipe(inject(gulp.src(['!gulpfile*.js', './**/*-compiled.js']).pipe(angularFilesort()), { addRootSlash: false })).pipe(gulp.dest('.'));

    gulp.src(['!index.html', './**/*.html']).pipe(templateCache()).pipe(gulp.dest('common'));
});

gulp.task('build_package', function () {
    //minify libs
    gulp.src(['../node_modules/angular/angular.js', '../node_modules/jquery/dist/jquery.js', '../node_modules/bootstrap/dist/js/bootstrap.js', '../node_modules/ui-router/release/angular-ui-router.js', '../node_modules/angular-sanitize/angular-sanitize.js', '../node_modules/moment/moment.js']).pipe(sourcemaps.init()).pipe(concat('all.min.js', { newLine: ';' })).pipe(uglify({ mangle: true })).pipe(sourcemaps.write('./')).pipe(gulp.dest('../public'));

    //minify angular files
    gulp.src(['!gulpfile*.js', './**/*-compiled.js']).pipe(sourcemaps.init()).pipe(concat('all-ng.min.js', { newLine: ';' })).pipe(ngAnnotate({
        add: true
    })).pipe(uglify({ mangle: true })).pipe(sourcemaps.write('./')).pipe(gulp.dest('../public'));

    //minify css
    gulp.src(['../node_modules/angular/angular-csp.css', '../node_modules/bootstrap/dist/css/bootstrap.css', './**/*.css']).pipe(concat('all.min.css')).pipe(cssmin()).pipe(gulp.dest('../public/css'));
    gulp.src(['../node_modules/bootstrap/fonts/**.*']).pipe(gulp.dest('../public/fonts'));

    gulp.src(['**/*.json', 'fonts/**/*.*', '**/*.svg']).pipe(gulp.dest('../public'));
});

gulp.task('send_to_ror', function () {
    gulp.src(['../public/**/*.*', '!../public/apanel/**.*', '!../public/**/*.map']).pipe(gulp.dest('../../ror/public/client'));
});

//# sourceMappingURL=gulpfile-compiled.js.map