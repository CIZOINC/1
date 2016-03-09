'use strict';

(function () {
    var LIVERELOAD_PORT, lrSnippet, mountFolder;
    var serveStatic = require('serve-static');

    LIVERELOAD_PORT = 35728;

    lrSnippet = require('connect-livereload')({
        port: LIVERELOAD_PORT
    });

    mountFolder = function (connect, dir) {
        return serveStatic(require('path').resolve(dir));
    };

    module.exports = function (grunt) {
        var yeomanConfig;
        require('load-grunt-tasks')(grunt);
        require('time-grunt')(grunt);

        /* configurable paths */
        yeomanConfig = {
            app: 'client',
            dist: '../../ror/public/admin_panel',
            docs: 'documentation',
            landing: 'landing'
        };
        try {
            yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
        } catch (_error) {
            console.error(_error);
        }
        grunt.initConfig({
            yeoman: yeomanConfig,
            watch: {
                compass: {
                    files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
                    tasks: ['compass:server']
                },
                less: {
                    files: ['<%= yeoman.app %>/styles-less/**/*.less'],
                    tasks: ['less:server']
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                jadeDocs: {
                    files: ['<%= yeoman.docs %>/jade/*.jade'],
                    tasks: ['jade:docs']
                },
                compassLanding: {
                    files: ['<%= yeoman.landing %>/styles/**/*.{scss,sass}'],
                    tasks: ['compass:landing']
                },
                jadeLanding: {
                    files: ['<%= yeoman.landing %>/jade/*.jade'],
                    tasks: ['jade:landing']
                },
                livereload: {
                    options: {
                        livereload: LIVERELOAD_PORT
                    },
                    files: [
                        '<%= yeoman.app %>/index.html',
                        '<%= yeoman.app %>/app/**/*.html',
                        '<%= yeoman.app %>/app/**/*.js',
                        '<%= yeoman.app %>/styles/**/*.scss',
                        '<%= yeoman.app %>/styles-less/**/*.less',
                        '.tmp/styles/**/*.css',
                        '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.docs %>/jade/*.jade',
                        '<%= yeoman.landing %>/jade/*.jade',
                        '<%= yeoman.landing %>/styles/**/*.{scss,sass}',
                        '<%= yeoman.landing %>/scripts/**/*.js'
                    ]
                }
            },
            connect: {
                options: {
                    port: 9009,
                    hostname: 'localhost'
                },
                livereload: {
                    options: {
                        middleware: function (connect) {
                            return [lrSnippet, mountFolder(connect, '.tmp'), mountFolder(connect, yeomanConfig.app)];
                        }
                    }
                },
                docs: {
                    options: {
                        middleware: function (connect) {
                            return [lrSnippet, mountFolder(connect, yeomanConfig.docs)];
                        }
                    }
                },
                landing: {
                    options: {
                        middleware: function (connect) {
                            return [lrSnippet, mountFolder(connect, yeomanConfig.landing)];
                        }
                    }
                },
                test: {
                    options: {
                        middleware: function (connect) {
                            return [mountFolder(connect, '.tmp'), mountFolder(connect, 'test')];
                        }
                    }
                },
                dist: {
                    options: {
                        middleware: function (connect) {
                            return [mountFolder(connect, yeomanConfig.dist)];
                        }
                    }
                }
            },
            open: {
                server: {
                    url: 'http://localhost:<%= connect.options.port %>'
                }
            },
            clean: {
                dist: {
                    options: {
                        force: true
                    },
                    files: [{
                        dot: true,
                        src: ['.tmp', '<%= yeoman.dist %>/*', '!<%= yeoman.dist %>/.git*']
                    }]
                },
                all: [
                    'readme.md',
                    '.tmp',
                    '.DS_Store',
                    '.sass-cache',
                    'client/bower_components',
                    'documentation/jade',
                    'documentation/config.codekit',
                    'landing/jade',
                    'landing/config.codekit',
                    'node_modules',
                    '.git'
                ],
                server: '.tmp'
            },
            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                all: ['Gruntfile.js', '<%= yeoman.app %>/scripts/**/*.js']
            },
            injector: {
                options: {
                    relative: true
                },
                local_dependencies: {
                    files: {
                        '<%= yeoman.app %>/index.html': [
                            '<%= yeoman.app %>/app/**/*.module.js',
                            '<%= yeoman.app %>/app/**/*.js',
                            '!' + '<%= yeoman.app %>/**/*.spec.js'
                        ]
                    }
                }
            },
            jade: {
                docs: {
                    options: {
                        pretty: true
                    },
                    files: {
                        '<%= yeoman.docs %>/index.html': ['<%= yeoman.docs %>/jade/index.jade']
                    }
                },
                landing: {
                    options: {
                        pretty: true
                    },
                    files: {
                        '<%= yeoman.landing %>/index.html': ['<%= yeoman.landing %>/jade/index.jade']
                    }
                }
            },
            compass: {
                options: {
                    sassDir: '<%= yeoman.app %>/styles',
                    cssDir: '.tmp/styles',
                    generatedImagesDir: '.tmp/styles/ui/images/',
                    imagesDir: '<%= yeoman.app %>/styles/ui/images/',
                    javascriptsDir: '<%= yeoman.app %>/scripts',
                    fontsDir: '<%= yeoman.app %>/fonts',
                    importPath: '<%= yeoman.app %>/bower_components',
                    httpImagesPath: 'styles/ui/images/',
                    httpGeneratedImagesPath: 'styles/ui/images/',
                    httpFontsPath: 'fonts',
                    relativeAssets: true
                },
                dist: {
                    options: {
                        outputStyle: 'compressed',
                        debugInfo: false,
                        noLineComments: true,
                        sourcemap: false
                    }
                },
                server: {
                    options: {
                        noLineComments: true,
                        sourcemap: true,
                        debugInfo: true
                    }
                },
                forvalidation: {
                    options: {
                        debugInfo: false,
                        noLineComments: false
                    }
                },
                landing: {
                    options: {
                        sassDir: '<%= yeoman.landing %>/styles',
                        cssDir: '<%= yeoman.landing %>/css',
                        sourcemap: false,
                        debugInfo: false,
                        noLineComments: true
                    }
                }
            },
            less: {
                server: {
                    options: {
                        strictMath: true,
                        dumpLineNumbers: true,
                        sourceMap: true,
                        sourceMapRootpath: '',
                        outputSourceFiles: true
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= yeoman.app %>/styles-less',
                        src: 'main.less',
                        dest: '.tmp/styles',
                        ext: '.css'
                    }]
                },
                dist: {
                    options: {
                        cleancss: true,
                        report: 'min'
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= yeoman.app %>/styles-less',
                        src: 'main.less',
                        dest: '.tmp/styles',
                        ext: '.css'
                    }]
                }
            },
            useminPrepare: {
                html: '<%= yeoman.app %>/index.html',
                options: {
                    dest: '<%= yeoman.dist %>',
                    flow: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: []
                    }
                }
            },
            usemin: {
                html: ['<%= yeoman.dist %>/**/*.html', '!<%= yeoman.dist %>/bower_components/**'],
                css: ['<%= yeoman.dist %>/styles/**/*.css'],
                options: {
                    dirs: ['<%= yeoman.dist %>']
                }
            },
            htmlmin: {
                dist: {
                    options: {},
                    files: [{
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: ['*.html', 'views/*.html'],
                        dest: '<%= yeoman.dist %>'
                    }]
                }
            },
            copy: {
                dist: {
                    files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            'favicon.ico',
                            'bower_components/font-awesome/css/*',
                            'bower_components/font-awesome/fonts/*',
                            'bower_components/weather-icons/css/*',
                            'bower_components/weather-icons/fonts/*',
                            'bower_components/weather-icons/font/*',
                            'fonts/**/*',
                            'i18n/**/*',
                            'images/**/*',
                            'styles/fonts/**/*',
                            'styles/img/**/*',
                            'styles/ui/images/*',
                            'app/**/*.html'
                        ]
                    }, {
                        expand: true,
                        cwd: '.tmp',
                        dest: '<%= yeoman.dist %>',
                        src: ['styles/**', 'assets/**']
                    }, {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    }]
                },
                styles: {
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    dest: '.tmp/styles/',
                    src: '**/*.css'
                }
            },
            concurrent: {
                server: ['compass:server', 'copy:styles'],
                lessServer: ['less:server', 'copy:styles'],
                lessDist: ['less:dist', 'copy:styles', 'htmlmin']
            },
            cssmin: {
                options: {
                    keepSpecialComments: '0'
                },
                dist: {}
            },
            concat: {
                options: {
                    separator: grunt.util.linefeed + ';' + grunt.util.linefeed
                },
                dist: {}
            },
            uglify: {
                options: {
                    mangle: false,
                    compress: {
                        drop_console: false
                    }
                },
                dist: {}
            },
            babel: {
                options: {
                    presets: ['es2015']
                },
                dist: {
                    files: [{
                        expand: true,
                        src: ['./.tmp/concat/scripts/app.js'],
                        ext: '.js'
                    }]
                }
            },
            replace: {
                development: {
                    options: {
                        patterns: [{
                            json: grunt.file.readJSON('./config/environments/development.json')
                        }]
                    },
                    files: [{
                        expand: true,
                        flatten: true,
                        src: ['./config/config.js'],
                        dest: '<%= yeoman.app %>/app/services/'
                    }]
                },
                staging: {
                    options: {
                        patterns: [{
                            json: grunt.file.readJSON('./config/environments/staging.json')
                        }]
                    },
                    files: [{
                        expand: true,
                        flatten: true,
                        src: ['./config/config.js'],
                        dest: '<%= yeoman.app %>/app/services/'
                    }]
                },
                production: {
                    options: {
                        patterns: [{
                            json: grunt.file.readJSON('./config/environments/production.json')
                        }]
                    },
                    files: [{
                        expand: true,
                        flatten: true,
                        src: ['./config/config.js'],
                        dest: '<%= yeoman.app %>/app/services/'
                    }]
                }
            }
        });

        grunt.loadNpmTasks('grunt-replace');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-compass');

        grunt.registerTask('serve', function (target) {
            if (target === 'dist') {
                return grunt.task.run(['replace:production', 'build', 'open', 'connect:dist:keepalive']);
            }
            console.error('running');
            return grunt.task.run(['replace:development', 'clean:server', 'concurrent:server', 'connect:livereload', 'replace:development', 'open', 'watch']);
        });

        grunt.registerTask('docs', function () {
            return grunt.task.run(['jade:docs', 'connect:docs', 'open', 'watch']);
        });

        grunt.registerTask('landing', function () {
            return grunt.task.run(['jade:landing', 'compass:landing', 'connect:landing', 'open', 'watch']);
        });

        grunt.registerTask('build', ['clean:dist', 'useminPrepare', 'compass:dist', 'copy:styles', 'htmlmin', 'copy:dist', 'cssmin', 'concat', 'babel', 'uglify', 'usemin']);

        grunt.registerTask('build-production', function () {
            var dest = '../../ror/public/admin_panel/production';
            yeomanConfig.dist = dest;
            grunt.config.set('yeoman.dist', dest);
            return grunt.task.run(['replace:production', 'build']);
        });

        grunt.registerTask('build-staging', function () {
            var dest = '../../ror/public/admin_panel/staging';
            yeomanConfig.dist = dest;
            grunt.config.set('yeoman.dist', dest);
            return grunt.task.run(['replace:staging', 'build']);
        });

        grunt.registerTask('clean-usemin', function () {
            grunt.config.set('uglify.generated.files', []);
            grunt.config.set('cssmin.generated.files', []);
            grunt.config.set('concat.generated.files', []);
        });

        grunt.registerTask('build-all', function () {
            return grunt.task.run(['build-production', 'clean-usemin', 'build-staging']);
        });

        return grunt.registerTask('default', ['serve']);
    };
})();
