'use strict';

angular.module('app.error.handling', ['app.notification'])
    .factory('appErrorInterceptor', ['$q', '$injector', function ($q, $injector) {

        return {

            'request': function (config) {
                return config || $q.when(config);
            },

            'requestError': function (rejection) {
                return $q.reject(rejection);
            },

            'response': function (response) {
                return response || $q.when(response);
            },

            'responseError': function (rejection) {
                var $notification = $injector.get('$notification');
                switch (rejection.status) {
                    case 0:
                        $notification.add({
                            title: 'Network error',
                            content: rejection.config.url,
                            type: $notification.constant.ERROR
                        });
                        break;
                    case 401:
                        $notification.add({
                            title: rejection.status + ' : Not authorized',
                            content: rejection.config.url,
                            type: $notification.constant.ERROR
                        });
                        break;
                    case 404:
                        $notification.add({
                            title: rejection.status + ' : Page Not Found',
                            content: rejection.config.url,
                            type: $notification.constant.ERROR
                        });
                        break;
                    case 500:
                        $notification.add({
                            title: rejection.status + ' : Internal Server Error',
                            content: rejection.data,
                            type: $notification.constant.ERROR
                        });
                        break;
                    default:
                        $notification.add({
                            title: rejection.status,
                            content: rejection.data,
                            type: $notification.constant.ERROR
                        });
                        break;
                }
                return $q.reject(rejection);
            }
        };
    }])
    .factory('$exceptionHandler', ['$injector', function ($injector) {
        return function (exception, cause) {
            var $notification = $injector.get('$notification');
            var $log = $injector.get('$log');

            try {
                $notification.add({
                    title: 'General error',
                    content: exception.message,
                    type: $notification.constant.ERROR
                });
            }
            catch (err) {
                angular.noop();
            }
        };
    }]);