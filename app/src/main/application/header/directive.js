'use strict';

angular.module('app.application')
    .directive('appHeader', [function () {

        return {
            restrict: 'A',
            templateUrl: 'src/main/application/header/view.html',
            link: function($scope, element){

            }
        };

    }]);