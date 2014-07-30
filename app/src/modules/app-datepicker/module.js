'use strict';

angular.module('app.datepicker', [])
    .directive('appDatepicker', ['$filter', '$translate', function ($filter, $translate) {

        var DATE_FORMAT_JQUERY = 'dd/mm/yy';
        var DATE_FORMAT_ANGULAR = 'dd/MM/yyyy';

        var stringToDate = function(string){
            var tab = string.split('/');
            return new Date(tab[2], tab[1] - 1, tab[0]);
        };

        return {
            restrict: 'A',
            template: '<input class="form-control" placeholder="{{placeholder}}" readonly="readonly"/>',
            scope: {
                value: '=ngModel'
            },
            link: function ($scope, element, attr) {

                var $input = element.find('input');
                if(attr.appDatepickerPlaceholder) {
                    $translate(attr.appDatepickerPlaceholder).then(function(text){
                        $scope.placeholder = text;
                    });
                }

                $input.datepicker({
                    showOn: 'both',
                    buttonText: '',
                    dateFormat:DATE_FORMAT_JQUERY
                });

                $scope.$watch(function(){
                    return $scope.value;
                }, function(value){
                    $input.val($filter('date')(value, DATE_FORMAT_ANGULAR));
                });

                $input.change(function(){
                    var dateStr = $(this).val();
                    var date = stringToDate(dateStr);
                    $scope.$apply(function(){
                        $scope.value = date.getTime();
                    });
                });

            }
        };

    }]).directive('dateAfter', function () {

        return {

            require: 'ngModel',

            link: function (scope, element, attrs, ngModelCtrl) {
                var date, otherDate;
                scope.$watch(attrs.dateAfter, function (value) {
                    otherDate = value;
                    validate();
                });
                scope.$watch(attrs.ngModel, function (value) {
                    date = value;
                    validate();
                });
                function validate() {
                    ngModelCtrl.$setValidity('dateAfter', !date || !otherDate || date >= otherDate);
                }
            }

        };

    })
;