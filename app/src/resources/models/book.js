'use strict';

angular.module('app').service('Book', ['Dao',function(Dao) {

    var Model = Dao.Book;

    return Model;

}]);