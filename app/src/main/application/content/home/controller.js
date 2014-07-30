'use strict';

angular.module('app.application')
    .controller('HomeCtrl', ['$scope', 'Book',
        function ($scope, Book) {
            $scope.books = Book.query();
        }]);