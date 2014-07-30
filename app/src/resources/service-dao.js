'use strict';

angular.module('app').service('Dao', ['$RestResource', function ($RestResource) {

    var myAppEndpoint = 'rest-api/';

    return {
        Me: $RestResource('Me', myAppEndpoint + 'me', {}),
        Book: $RestResource('Book', myAppEndpoint + 'books', {})
    };
}]);