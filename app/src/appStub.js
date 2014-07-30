'use strict';

angular.module('appStub', [
    'ngMockE2E',
    'ngResource',
    'app.interceptor.stub',
    'app'
]).config(['$httpProvider', '$urlRouterProvider', '$stateProvider',
    function ($httpProvider, $urlRouterProvider, $stateProvider) {

        /** Routes */
        $stateProvider
            .state('fake-auth', {
                url: '/auth',
                templateUrl: 'src/main/fake-auth/view.html',
                onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.ready = true;
                }],
                controller: ['$scope', '$state', 'Me',
                    function ($scope, $state, Me) {
                        $scope.roles = Me.const.ROLES;
                        $scope.loadMe = function (role) {
                            role = role.toLowerCase();
                            sessionStorage.setItem('role', role);
                            location.reload();
                        };
                        if (sessionStorage.getItem('role')) {
                            $state.go('main');
                        }
                    }]
            });
        /** END Routes */

        /** Interceptor **/
        $httpProvider.interceptors.push('appInterceptorStub');
        /** END OF Interceptor **/

    }]).run(['$httpBackend', '$resource', '$rootScope',
    function ($httpBackend, $resource, $rootScope) {

        $rootScope.$on('$stateChangeSuccess', function (ev, to) {
            if (to.name) {
                sessionStorage.setItem('from', to.name);
            }
        });

        /** Mocked Resources */
        //User
        var role = sessionStorage.getItem('role');
        if (role) {
            $httpBackend.whenGET(/rest-api\/me$/).respond($resource('src/resources/stub/me/GET-' + role + '.json').get().$promise);
            var $logout = $('<a href style="position: absolute;right: 0;zoom: 3;"><span class="glyphicon glyphicon-log-out"></span></a>');
            $logout.click(function () {
                sessionStorage.removeItem('role');
                window.location = window.location.origin + '/#/auth';
            });
            $('body').prepend($logout);
        }

        // Book
        $httpBackend.whenGET(/rest-api\/books$/).respond($resource('src/resources/stub/book/GET.json').query());

        $httpBackend.whenGET(/.*$/).passThrough();
        $httpBackend.whenPUT(/.*$/).passThrough();
        $httpBackend.whenPOST(/.*$/).passThrough();
        $httpBackend.whenDELETE(/.*$/).passThrough();
        /** END OF Mocked Resources */


    }]);