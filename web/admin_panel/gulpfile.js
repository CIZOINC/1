'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    sass = require('gulp-sass'),
    del = require('del'),
    logger = require('tracer').colorConsole(),
    spritesmith = require('gulp.spritesmith'),
    merge = require('merge-stream'),
    browserSync = require('browser-sync');

var paths = {
        source: {
            styles: {
                base: `${__dirname}/client/styles`,
                files: [`${__dirname}/client/styles/**/*.scss`, '!**/_*.scss'],
                sprites: `${__dirname}/client/styles/ui/images/flags/*.png`
            },
            html: {
                base: `${__dirname}/client/app`,
                files: `${__dirname}/client/app/**/*.html`
            },
            i18n: {
                base: `${__dirname}/client/i18n`,
                files: `${__dirname}/client/i18n/**/*.json`
            },
            images: {
                base: `${__dirname}/client/images`,
                files: `${__dirname}/client/images/**/*`
            },
            js: ''
        },
        dest: {
            prod: `${__dirname}/build`,
            serve: ''
        },
        watch: {
            styles: [`${__dirname}/client/**/*.scss`],
            html: [`${__dirname}/client/**/*.html`],
            images: [`${__dirname}/client/images/**.*`]
        }
    },
    prod = false;

// Clean files task
gulp.task('clean', function () {
    return del([paths.dest.prod]);
});

gulp.task('copy', ['clean', 'copy:html', 'copy:i18n', 'copy:images']);

// Copy HTML task
gulp.task('copy:html', ['clean'], function () {
    return gulp
        .src(paths.source.html.files)
        // .pipe(debug())
        .pipe(gulp.dest(`${paths.dest.prod}/app`));
});

// Copy Images task
gulp.task('copy:images', ['clean'], function () {
    return gulp
        .src(paths.source.images.files)
        // .pipe(debug())
        .pipe(gulp.dest(`${paths.dest.prod}/images`));
});

// Copy HTML task
gulp.task('copy:i18n', ['clean'], function () {
    return gulp
        .src(paths.source.i18n.files)
        // .pipe(debug())
        .pipe(gulp.dest(`${paths.dest.prod}/i18n`));
});

gulp.task('styles', ['clean', 'styles:sass'], function () {
    logger.info('Finished running all style stuff');
});

// SASS task
gulp.task('styles:sass', ['clean', 'styles:sprites'], function () {
    return gulp
        .src(paths.source.styles.files)
        // .pipe(debug())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${paths.dest.prod}/styles`));
});

// Sprites task
gulp.task('styles:sprites', ['clean'], function () {
    // Generate our spritesheet
    let spriteData = gulp
        .src(paths.source.styles.sprites)
        // .pipe(debug())
        .pipe(spritesmith({
            imgName: 'flags.png',
            cssName: '_sprites.scss',
            algorithm: 'top-down'
        }));
    // Pipe image stream through image optimizer and onto disk
    let imgStream = spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(gulp.dest(`${paths.source.styles.base}/ui/components/`));

    // Pipe CSS stream through CSS optimizer and onto disk
    let cssStream = spriteData.css
        .pipe(gulp.dest(`${paths.source.styles.base}/ui/components/`));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
});

// Watch task
// Browsersync task

// build
gulp.task('build', ['clean', 'default'], function (cb) {
    logger.info(cb);
});

// Default task
gulp.task('default', ['clean', 'styles', 'copy'], function () {
    gulp.watch(paths.watch.styles, ['styles']);
    gulp.watch(paths.watch.html, ['copy:html']);
    gulp.watch(paths.watch.images, ['copy:images']);
});
