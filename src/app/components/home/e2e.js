'use strict';

describe('Home', function() {

    beforeEach(function() {
        browser.get('/');
    });

    it('should have <home>', function() {
        /* eslint-disable no-undef */
        var home = element(by.css('app home'));
        /* eslint-enable no-undef */
        expect(home.isPresent()).toEqual(true);
        expect(home.getText()).toEqual('Home Works!');
    });

});
