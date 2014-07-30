'use strict';

angular.module('app.i18n', [
    'pascalprecht.translate'
]).config([
    '$translateProvider',
    function ($translateProvider) {

        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });
        $translateProvider.preferredLanguage('en');

        $translateProvider.use('en');

        $translateProvider.cloakClassName('hidden');

    }
]);