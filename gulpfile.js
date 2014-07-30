'use strict';

var gulp = require('gulp');
var open = require('open');
var app = require('./bower.json');

// Load plugins
var $ = require('gulp-load-plugins')();


var server;

// Styles
gulp.task('styles', ['clean'], function () {
    return gulp.src('app/src/main/style.scss')
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/'));
});

// Copy
gulp.task('copy', ['styles'], function () {
    gulp.src(['app/bower_components/bootstrap/dist/fonts/*']).pipe(gulp.dest('dist/fonts'));
    gulp.src(['app/i18n/**/*.json']).pipe(gulp.dest('dist/i18n'));
    gulp.src(['app/src/**/*.json']).pipe(gulp.dest('dist/src'));
    gulp.src(['app/META-INF/**/*.*']).pipe(gulp.dest('dist/META-INF'));
    return gulp.src([
        'app/index.html',
        'app/robots.txt'
    ]).pipe(gulp.dest('dist'));
});

// Templates
gulp.task('template', ['html'], function () {
    return gulp.src(['app/src/**/*.html'])
        .pipe($.angularTemplatecache({module: 'app', root: 'src/'}))
        .pipe(gulp.dest('dist/scripts'));
});

// HTML
gulp.task('html', ['copy'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/index.html')
        .pipe($.replace(/<html/, '<html manifest="app.manifest"'))
        //.pipe($.replace(/ng\-app="appMock"/, 'ng-app="app"'))// Uncomment to build app instead of appMock
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.uglify({
            output: {
                ascii_only: true
            }
        }))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist'], { read: false }).pipe($.clean());
});

// Build
gulp.task('dist', ['template'], function () {
    return gulp.src([
        'dist/**/*.js',
        'dist/**/*.css'
    ])
        .pipe($.manifest({
            hash: true,
            filename: 'app.manifest',
            exclude: 'app.manifest'
        }))
        .pipe($.replace(/%5C/g, '\/'))// Bug into manifest plugin 0.0.4
        .pipe(gulp.dest('dist'));
});

// Default task
gulp.task('default', ['serve']);

gulp.task('server', ['styles'], function () {
    $.connect.server({
        root: ['app'],
        port: 9000,
        livereload: true
    });
    open('http://localhost:9000/#/auth');
});

gulp.task('serve:e2e', [], function () {
    $.connect.server({
        root: ['app'],
        port: 9001
    });
});

gulp.task('serve:production', ['dist'], function () {
    $.connect.server({
        root: ['dist'],
        port: 9000
    });
    open('http://localhost:9000');
});

// Test
gulp.task('test:unit', function () {
    return gulp.src('not-exist.js').pipe($.plumber()).pipe($.karma({configFile: 'karma.conf.js'}));
});
gulp.task('test:e2e', ['serve:e2e'], function () {
    return gulp.src('not-exist.js').pipe($.plumber()).pipe($.karma({configFile: 'karma.conf.e2e.js', action: 'run'})).on('end', function () {
        $.connect.serverClose();
    }).on('error', function () {
        $.connect.serverClose();
    });
});

// Watch
gulp.task('serve', ['server'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        'app/index.html',
        'app/style.css',
        'app/src/**/*.html',
        'app/src/**/*.js',
        'app/modules/**/*.js'
    ], function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });

    // Watch .scss files
    gulp.watch('app/src/**/*.scss', ['styles']);
});

// Test
gulp.task('test', ['test:unit', 'test:e2e']);

