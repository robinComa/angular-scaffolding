'use strict';

angular.module('app.application')
    .controller('State1Ctrl', ['$scope', 'Book',
        function ($scope, Book) {
            $scope.books = Book.query();
        }]);