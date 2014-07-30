'use strict';

angular.module('app.interceptor.dev', [])
    .constant('restEndpoint', 'http://localhost:8080/myApp/rest-api/')
    .factory('appInterceptorDev', ['restEndpoint', '$q', function (restEndpoint, $q) {

        return {
            request: function (config) {
                if (config.url.match(/^\/rest-api\//)) {
                    config.url = restEndpoint + config.url.slice(10, config.url.length);
                }

                config.withCredentials = true;
                config.headers = config.headers || {};
                config.headers.SPRING_USER_ID = sessionStorage.getItem('role');
                return config || $q.when(config);
            },

            'requestError': function (rejection) {
                return $q.reject(rejection);
            },

            'response': function (response) {
                return response;
            },

            'responseError': function (rejection) {
                return $q.reject(rejection);
            }
        };

    }]);