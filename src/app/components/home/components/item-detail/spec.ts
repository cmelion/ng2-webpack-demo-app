/* beautify ignore:start */
import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {ItemDetailComponent} from './index';
/* beautify ignore:end */

describe('Component: ItemDetailComponent', () => {

            beforeEachProviders(() => []);

            it('should be defined', inject([TestComponentBuilder], (tcb) => {
                            return tcb.createAsync(ItemDetailComponent)
                                .then((fixture) => {
                                        let element = fixture.debugElement.nativeElement;
                                        let cmpInstance = <ItemDetailComponent>fixture.debugElement.componentInstance;
                fixture.detectChanges();

                expect(cmpInstance).toBeDefined();
                expect(element).toBeDefined();
            });
    }));

});