# Dialog Module

This module is a bootstrap modal launcher into controller.

## How to use :

    $dialog.confirmation({
        scope: $scope,
        title: $translate('sample.fleets.deletion.title'),
        content: $translate('sample.fleets.deletion.message'),
        onYes: function(modal){
            ...
        },
        onNo: function(modal){
            modal.$hide();
            ...
        }
    });
