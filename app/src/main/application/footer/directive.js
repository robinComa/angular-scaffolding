'use strict';

angular.module('app.application')
    .directive('appFooter', [function () {

        return {
            restrict: 'A',
            templateUrl: 'src/main/application/footer/view.html',
            link: function($scope, element){

            }
        };

    }]);