'use strict';

angular.module('app').service('Me', ['Dao',function(Dao) {

    var Model = Dao.Me;

    Model.const = {
        ROLES: {
            ROLE1                      : 'ROLE1',
            ROLE2                      : 'ROLE2'
        },
        RIGHTS: {
            VIEW_OBJ                   : 'VIEW_OBJ',
            DELETE_OBJ                 : 'DELETE_OBJ',
            CREATE_OBJ                 : 'CREATE_OBJ'
        }
    };

    Model.prototype.getName = function() {
        return (this.firstName + ' ' + this.lastName);
    };

    Model.prototype.isRole1 = function() {
        return this.roles.indexOf(Model.const.ROLES.ROLE1) !== -1;
    };

    Model.prototype.isRole2 = function() {
        return this.roles.indexOf(Model.const.ROLES.ROLE2) !== -1;
    };

    Model.prototype.hasRight = function(right) {
        return this.rights.indexOf(right) !== -1;
    };

    return Model;
}]);