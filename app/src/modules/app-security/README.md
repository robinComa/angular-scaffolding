# Security Module

This module is a security controller.

## How to use :

    onEnter: ['me', '$security', function(me, $security){
        $security.secure(me.isAdmin());
    }]
