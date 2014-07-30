'use strict';

angular.module('app.resource', [
    'ngResource'
])
    .factory('$RestResource', ['$q', '$resource', '$injector', function ($q, $resource, $injector) {

        return function (serviceName, url, params, methods) {

            var customSave = function (params) {
                if (this.id) {
                    if (params) {
                        params.id = this.id;
                    } else {
                        params = {id: this.id};
                    }
                    return this.$update(params);
                } else {
                    return this.$create(params);
                }
            };

            var obj;
            var defaults = {
                query: {
                    isArray: true,
                    transformResponse: function (data) {
                        try {
                            if (typeof data === 'string') {
                                try {
                                    return angular.fromJson(data);
                                } catch (err) {
                                    angular.noop();
                                }
                            } else {
                                if (data && data.length) {
                                    for (var i = 0; i < data.length; i++) {
                                        data[i].$save = customSave;
                                    }
                                }
                                return data;
                            }
                        }
                        catch (err) {
                            angular.noop();
                        }
                    }
                },
                create: {
                    method: 'POST',
                    transformRequest: function (data) {
                        obj = angular.copy(data);
                        return JSON.stringify(obj);
                    },
                    interceptor: {
                        response: function (response) {
                            var deferred = $q.defer();
                            if (response.data.then) {
                                response.data.then(function (data) {
                                    if (data.id === 0) {
                                        //Random id for Mock mode
                                        obj.id = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
                                    } else {
                                        obj.id = data.id;
                                    }
                                    deferred.resolve(obj);
                                }, deferred.reject);
                            } else if (response.data) {
                                obj.id = response.data.id;
                                setTimeout(function(){
                                    deferred.resolve(obj);
                                },1);
                            }
                            return deferred.promise;
                        }
                    }
                },
                update: {
                    method: 'PUT',
                    transformRequest: function (data) {
                        obj = angular.copy(data);
                        return angular.toJson(data);
                    },
                    interceptor: {
                        response: function () {
                            return obj;
                        }
                    }
                },
                get: {
                    method: 'GET',
                    transformResponse: function (response, headersGetter) {
                        try {
                            if (typeof response === 'string') {
                                return angular.fromJson(response);
                            } else {
                                var deferred = $q.defer();
                                response.then(function (data) {
                                    var Service = $injector.get(serviceName);
                                    deferred.resolve(new Service(data));
                                }, deferred.reject);
                                return deferred.promise;
                            }
                        }
                        catch (err) {
                            angular.noop();
                        }
                    }
                }
            };

            var Resource = $resource(url, params, angular.extend(defaults, methods));

            Resource.prototype.$save = customSave;

            return Resource;
        };
    }]);