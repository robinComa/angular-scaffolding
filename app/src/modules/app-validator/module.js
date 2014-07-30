'use strict';

angular.module('app.validator', [])
    .directive('appInteger', function () {
        var INTEGER_REGEXP = /^\-?\d+$/;
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (INTEGER_REGEXP.test(viewValue)) {
                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('integer', false);
                        return undefined;
                    }
                });
            }
        };
    }).directive('appFloat', function () {
        var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (FLOAT_REGEXP.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue.toString().replace(',', '.'));
                    } else {
                        ctrl.$setValidity('float', false);
                        return undefined;
                    }
                });
            }
        };
    }).directive('requiredMultiple', function () {
        function isEmpty(value) {
            return angular.isUndefined(value) || (angular.isArray(value) && value.length === 0) || value === '' || value === null || value !== value;
        }

        return {
            require: '?ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (!ctrl){
                    return;
                }
                // force truthy in case we are on non input element
                attr.required = true;

                var validator = function (value) {
                    if (attr.required && (isEmpty(value) || value === false)) {
                        ctrl.$setValidity('required', false);
                        return;
                    } else {
                        ctrl.$setValidity('required', true);
                        return value;
                    }
                };

                ctrl.$formatters.push(validator);
                ctrl.$parsers.unshift(validator);

                attr.$observe('required', function () {
                    validator(ctrl.$viewValue);
                });
            }
        };
    });