'use strict';

/**
 * Directive to create a long text truncated with tooltip
 */
angular.module('app.truncated.text', []).directive('appTruncatedText', function(){
    return {
        restrict: 'A',
        template: '{{text}}',
        link: function (scope, elem, attrs) {
            var MAX = parseInt(attrs.appTruncatedMax);
            var REPLACEMENT = '...';

            if(attrs.appTruncatedText.length >= MAX){
                scope.text = attrs.appTruncatedText.substring(0, MAX - REPLACEMENT.length) + REPLACEMENT;
                $(elem).append($('<span></span>').attr({
                    'class': 'icon-plus'
                }).tooltip({
                    title: attrs.appTruncatedText,
                    placement: 'auto',
                    'trigger': 'click'
                }));
            }else{
                scope.text = attrs.appTruncatedText;
            }
        }
    };
});