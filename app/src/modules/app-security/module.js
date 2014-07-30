'use strict';

angular.module('app.security', [
    'ui.router'
]).config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider) {

        $stateProvider
            .state('app-security-forbidden', {
                templateUrl: 'src/modules/app-security/view.html'
            });

    }
]).factory('$security', ['$state', function ($state) {

    return{
        userInRole: function (userRoles, authRoles) {
            for (var i = 0; i < authRoles.length; i++) {
                for (var j = 0; j < userRoles.length; j++) {
                    if (authRoles[i] === userRoles[j]) {
                        return true;
                    }
                }
            }
            return false;
        },
        secure: function (hasRole) {
            if (!hasRole) {
                $state.go('app-security-forbidden');
            }
        }
    };
}]);