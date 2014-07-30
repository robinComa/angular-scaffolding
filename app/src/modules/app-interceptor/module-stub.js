'use strict';

angular.module('app.interceptor.stub', [])
    .factory('appInterceptorStub', ['$q', '$timeout', function ($q, $timeout) {

        var getMockedAsyncRespondTime = function (url) {
            switch (url.split(/\./).pop()) {
                case 'json':
                    return 300;
                case 'html':
                    // In production all views are into cachedUrl as JS Templates
                    return 0;
                default:
                    // Web Services
                    return 1000;
            }
        };

        return {

            'request': function (config) {
                return config || $q.when(config);
            },

            'requestError': function (rejection) {
                return $q.reject(rejection);
            },

            'response': function (response) {
                var defer = $q.defer();
                $timeout(function () {
                    defer.resolve(response);
                }, getMockedAsyncRespondTime(response.config.url.toString()));
                return defer.promise;
            },

            'responseError': function (rejection) {
                return $q.reject(rejection);
            }
        };
    }]);