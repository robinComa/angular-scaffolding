'use strict';

angular.module('appDev', [
        'app.interceptor.dev',
        'app'
    ]).config(['$httpProvider', '$stateProvider',
    function ($httpProvider, $stateProvider) {
        /** Routes */
        $stateProvider
            .state('fake-auth', {
                url: '/auth',
                templateUrl: 'src/main/fake-auth/view.html',
                onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.ready = true;
                }],
                controller: ['$scope', '$state', '$httpBackend', '$resource', 'Me',
                    function ($scope, $state, $httpBackend, $resource, Me) {
                        $scope.roles = Me.const.ROLES;
                        $scope.loadMe = function (role) {
                            role = role.toLowerCase();
                            sessionStorage.setItem('role', role);
                            if ($('body').find('icon-logout').size() < 1) {
                                var $logout = $('<a href><span class="icon-logout icon-x3 pull-right"></span></a>');
                                $logout.click(function () {
                                    sessionStorage.removeItem('role');
                                    window.location = window.location.origin;
                                });
                                $('body').prepend($logout);
                            }
                            $state.go('main');
                        };
                    }]
            });
        /** END Routes */

        /** Interceptor **/
        $httpProvider.interceptors.push('appInterceptorDev');
        /** END OF Interceptor **/
    }]);

angular.module('appDevConstant', []).constant('restEndpoint', 'http://localhost:8080/myApp/rest-api/');