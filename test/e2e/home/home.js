describe('E2E: TeamCopter home page labels', function() {

    beforeEach(function() {

        browser().navigateTo('/#/auth');
        element('#ROLE1').click();
        browser().navigateTo('/#/home');
    });

    it('Book counter', function() {
        var books = repeater('div[ui-view] ul li[ng-repeat]');
        expect(books.count()).toMatch(3);
    });
});
