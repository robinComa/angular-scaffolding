'use strict';

angular.module('app.application')
    .directive('appMenu', [function () {

        return {
            restrict: 'A',
            templateUrl: 'src/main/application/menu/view.html',
            link: function($scope, element){

            }
        };

    }]);