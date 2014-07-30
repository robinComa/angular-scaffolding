'use strict';

angular.module('app.notification', [])

    .factory('$notification', ['$alert', '$rootScope', function($alert, $rootScope){

        var service = {
            const: {
                ERROR: 'danger',
                WARNING: 'warning',
                INFO: 'info',
                SUCCESS: 'success'
            },
            add: function (attr) {
                attr.scope = $rootScope.$new();
                if(attr.title) {
                    if(attr.title.then){
                        attr.title.then(function(title){
                            attr.scope.title = attr.type.toUpperCase() + '!' + title;
                        });
                    }else{
                        attr.scope.title = attr.type.toUpperCase() + '!' + attr.title;
                    }
                }
                if(attr.content) {
                    if(attr.content.then){
                        attr.content.then(function (content) {
                            attr.scope.content = content;
                        });
                    }else{
                        attr.scope.content = attr.content;
                    }
                }
                delete attr.title;
                delete attr.content;
                attr.container = '#app-notification';
                attr.duration = 5;
                $alert(attr);
            }
        };

        return service;

    }]);