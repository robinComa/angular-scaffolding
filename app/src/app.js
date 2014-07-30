'use strict';

angular.module('app', [
    'ui.router',
    'pascalprecht.translate',
    'ngAnimate',
    'angular-loading-bar',
    'app.cache',
    'app.i18n',
    'app.security',
    'app.truncated.text',
    'app.notification',
    'app.dialog',
    'app.resource',
    'app.validator',
    'app.safequit',
    'app.htmlunsafe',
    'app.datepicker',
    'app.application',
    'app.error.handling'
]).config([
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    '$httpProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider, $locationProvider) {

        $locationProvider.html5Mode(false);

        /** Routes */
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'src/main/view.html',
                resolve: {
                    me: ['Me', function (Me) {
                        return Me.get().$promise;
                    }],
                    i18n: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('common');
                        $translatePartialLoader.addPart('header');
                        $translatePartialLoader.addPart('menu');
                        $translatePartialLoader.addPart('footer');
                        return $translate.refresh();
                    }]
                },
                controller: ['$rootScope', 'me', '$state',
                    function ($rootScope, me, $state) {
                        $rootScope.ready = true;
                        $rootScope.state = $state;

                        // TODO remove into non stub mode
                        if(['fake-auth', 'main'].indexOf(sessionStorage.getItem('from')) === -1){
                            $state.go(sessionStorage.getItem('from'));
                            return;
                        }

                        $state.go('home');
                    }]
            });

        /** END Routes */

        /** Interceptor **/
        $httpProvider.interceptors.push('appErrorInterceptor');
        /** END OF Interceptor **/
    }
]);