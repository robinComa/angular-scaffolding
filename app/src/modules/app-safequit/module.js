'use strict';

angular.module('app.safequit', [
    'ui.router'
])

.service('SafeQuit', ['$window', '$rootScope', '$dialog', '$translate', '$state',
        function ($window, $rootScope, $dialog, $translate, $state) {

        var stateChangeEvent;
        var usedOnce = false;

        return{
            on: function(message){
                if (!usedOnce) {
                    message.then(function(message){
                        $window.onbeforeunload = function (e) {
                            e = e || window.event;
                            // For IE and Firefox
                            if (e) {
                                e.returnValue = message;
                            }
                            // For Safari
                            return message;
                        };
                    });
                    stateChangeEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                        event.preventDefault();
                        $dialog.question({
                            scope: $rootScope,
                            title: $translate('confirmation.message.title'),
                            content: message,
                            confirm: $translate('confirmation.button.leaving.page.continue'),
                            cancel: $translate('confirmation.button.leaving.page.stay'),
                            onConfirm: function (modal) {
                                modal.$hide();
                                usedOnce = false;
                                // Detach event
                                stateChangeEvent();
                                $state.go(toState, toParams);
                            },
                            onCancel: function (modal) {
                                modal.$hide();
                            }
                        });
                    });
                    usedOnce = true;
                }
            },
            off: function(){
                $window.onbeforeunload = null;
                if (stateChangeEvent) {
                    stateChangeEvent();
                }
                usedOnce = false;
            }
        };

    }]);