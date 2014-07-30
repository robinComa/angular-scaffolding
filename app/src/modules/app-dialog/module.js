'use strict';

angular.module('app.dialog', [
    'mgcrea.ngStrap'
])

    .factory('$dialog', ['$modal',
        function($modal){

        var service = {
            const: {
                FORM: 'src/modules/app-dialog/form.html',
                CONFIRMATION: 'src/modules/app-dialog/confirmation.html',
                QUESTION: 'src/modules/app-dialog/question.html',
                INFORMATION: 'src/modules/app-dialog/information.html',
                DESCRIPTION: 'src/modules/app-dialog/description.html'
            },
            form: function(attr){
                attr.scope = attr.scope.$new();
                attr.title.then(function(title){
                    attr.scope.title = title;
                });
                delete attr.title;
                attr.scope.onSubmit = attr.onSubmit;
                attr.scope.onCancel = attr.onCancel;
                delete attr.onSubmit;
                delete attr.onCancel;
                attr.template = this.const.FORM;
                $modal(attr);
            },
            confirmation: function(attr){
                attr.scope = attr.scope.$new();
                attr.title.then(function(title){
                    attr.scope.title = title;
                });
                attr.content.then(function(content){
                    attr.scope.content = content;
                });
                delete attr.title;
                delete attr.content;
                attr.scope.onYes = attr.onYes;
                attr.scope.onNo = attr.onNo;
                delete attr.onYes;
                delete attr.onNo;
                attr.template = this.const.CONFIRMATION;
                $modal(attr);
            },
            question: function(attr) {
                attr.scope = attr.scope.$new();
                attr.title.then(function (title) {
                    attr.scope.title = title;
                });
                attr.content.then(function (content) {
                    attr.scope.content = content;
                });
                attr.confirm.then(function (confirm) {
                    attr.scope.confirm = confirm;
                });
                attr.cancel.then(function (cancel) {
                    attr.scope.cancel = cancel;
                });
                delete attr.title;
                delete attr.content;
                delete attr.confirm;
                delete attr.cancel;
                attr.scope.onConfirm = attr.onConfirm;
                attr.scope.onCancel = attr.onCancel;
                delete attr.onConfirm;
                delete attr.onCancel;
                attr.template = this.const.QUESTION;
                $modal(attr);
            },
            information: function(attr){
                attr.scope = attr.scope.$new();
                attr.title.then(function(title){
                    attr.scope.title = title;
                });
                attr.content.then(function(content){
                    attr.scope.content = content;
                });
                delete attr.title;
                delete attr.content;
                attr.scope.onOk = attr.onOk;
                delete attr.onOk;
                attr.template = this.const.INFORMATION;
                $modal(attr);
            },
            description: function(attr){
                attr.scope = attr.scope.$new();
                attr.title.then(function(title){
                    attr.scope.title = title;
                });
                delete attr.title;
                attr.scope.onBack = attr.onBack;
                delete attr.onBack;
                attr.template = this.const.DESCRIPTION;
                $modal(attr);
            },
            custom: function(attr){
                $modal(attr);
            }
        };

        return service;

    }]);