module.exports = function (config) {
    config.set({

        frameworks: ['jasmine'],

        autoWatch: true,
        singleRun: false,

        exclude: [
            '**/e2e/**/*.js'
        ],

        files: [
            'app/bower_components/jquery/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/angular-translate/angular-translate.js',
            'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
            'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'app/bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-strap/dist/angular-strap.js',

            'app/bower_components/tinymce/tinymce.min.js',
            'app/bower_components/angular-ui-tinymce/src/tinymce.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-loading-bar/build/loading-bar.js',
            'app/src/modules/app-notification/*.js',
            'app/src/modules/**/*.js',
            'app/src/main/application/module.js',
            'app/src/app.js',
            'app/src/appStub.js',
            'app/src/resources/**/*.js',
            'app/src/main/**/*.js',
            'test/unit/**/*.js'
        ],

        browsers: ['PhantomJS'],

        reporters: ['progress', 'coverage', 'junit'],

        preprocessors: {
            'app/src/**/*.js': 'coverage'
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'reports/coverage/'
        },

        junitReporter: {
            outputFile: 'reports/tu.xml'
        }

    });
};