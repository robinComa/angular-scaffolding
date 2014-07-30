describe('E2E: Menu label', function() {

    beforeEach(function() {
        browser().navigateTo('/#/auth');
        browser().navigateTo('/#/home');
    });

    it('#REQ-XXX : Menu access rule', function() {
        expect(element('div[app-menu]').count()).toBe(1);
    });

});