import {
    it,
    inject,
    describe,
    beforeEachProviders
} from '@angular/core/testing';

import {Component, provide} from '@angular/core';

// Load the implementations that should be tested
import {About} from './index.async';
import {NGReact} from './components/ng-react';

describe('About', () => {
    beforeAll(() => {
        spyOn(NGReact,'initialize');
    });

    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        About
    ]);

    it('should log ngOnInit', inject([About], (about) => {
        about.ngOnInit();
        expect(NGReact.initialize).toHaveBeenCalled();
    }));

});