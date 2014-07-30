'use strict';

angular.module('app.cache', [])
    .config([function () {

        // Enable new cache when available and reload page
        window.applicationCache.addEventListener('updateready', function () {
            window.applicationCache.swapCache();
            console.log('Cache updating');
            window.location.reload();
        }, false);

        // Cache in error
        window.applicationCache.addEventListener('error', function () {
            console.log('Cache in error : ');
        }, false);

        // Check of the manifest release
        window.applicationCache.addEventListener('checking', function () {
            console.log('Cache checking' );
        }, false);

        // Manifest changed : download the new content
        window.applicationCache.addEventListener('obsolete', function () {
            console.log('Cache not up-to-date');
            window.applicationCache.update();
        }, false);

        // Manifest not changed
        window.applicationCache.addEventListener('noupdate', function () {
            console.log('Manifest not changed');
        }, false);
    }]);