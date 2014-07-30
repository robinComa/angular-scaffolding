'use strict';

angular.module('app.application', [
    'ui.router',
    'ngResource',
    'pascalprecht.translate',
    'app.security'
]).config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('application', {
                abstract: true,
                url: '',
                template: '<div app-header class="col-xs-12"></div><div app-menu class="col-xs-12"></div><div ui-view class="col-xs-12"></div><div app-footer class="col-xs-12">',
                parent: 'main',
                onEnter: ['me', '$security', function(me, $security){
                    $security.secure(me.isRole1() || me.isRole2());
                }]
            })
            .state('home', {
                parent: 'application',
                url: 'home',
                templateUrl: 'src/main/application/content/home/view.html',
                controller: 'HomeCtrl',
                resolve: {
                    i18n: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('home');
                        return $translate.refresh();
                    }]
                }
            })
            .state('state1', {
                parent: 'application',
                url: 'state1',
                templateUrl: 'src/main/application/content/state1/view.html',
                controller: 'State1Ctrl',
                resolve: {
                    i18n: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('state1');
                        return $translate.refresh();
                    }]
                }
            });

    }
]);