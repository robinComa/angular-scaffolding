describe('UNIT: Me Model', function() {

    var Me;

    beforeEach(module('app'));
    beforeEach(inject(function(_$httpBackend_, _Me_){
        Me = _Me_;
    }));

    it('# : ROLE1 roles', function () {
        var me = Me.get();
        me.roles = [Me.const.ROLES.ROLE1];
        expect(me.isRole1()).toBe(true);
        expect(me.isRole2()).toBe(false);
    });

    it('# : ROLE2 roles', function () {
        var me = Me.get();
        me.roles = [Me.const.ROLES.ROLE2];
        expect(me.isRole2()).toBe(true);
        expect(me.isRole1()).toBe(false);
    });

    it('# : All roles', function () {
        var me = Me.get();
        me.roles = [Me.const.ROLES.ROLE1, Me.const.ROLES.ROLE2];
        expect(me.isRole1()).toBe(true);
        expect(me.isRole2()).toBe(true);
    });

    it('# : NO roles', function () {
        var me = Me.get();
        me.roles = [];
        expect(me.isRole1()).toBe(false);
        expect(me.isRole2()).toBe(false);
    });

    it('# : has rights', function () {
        var me = Me.get();
        me.rights = [];
        expect(me.hasRight(Me.const.RIGHTS.DELETE_OBJ)).toBe(false);
        me.rights = [Me.const.RIGHTS.DELETE_OBJ];
        expect(me.hasRight(Me.const.RIGHTS.DELETE_OBJ)).toBe(true);
    });

});