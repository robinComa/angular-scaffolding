'use strict';

angular.module('app.htmlunsafe', [
    'ngSanitize'
]).directive('appHtmlUnsafe', ['$compile', function ($compile) {
    return {
        scope: {
            appHtmlUnsafe: '='
        },
        link: function ($scope, element) {
            // Create re-useable compile function
            var compile = function (newHTML) {
                // Compile html
                newHTML = $compile(newHTML)($scope);
                // Clear and append it
                element.html('').append(newHTML);
            };

            $scope.$watch(function () {
                    return $scope.appHtmlUnsafe;
                },
                // Watch for changes to
                function (newHTML) {
                    // the HTML
                    if (!newHTML) {
                        return;
                    }
                    // Compile it
                    compile(newHTML);
                });

        }
    };
}]);