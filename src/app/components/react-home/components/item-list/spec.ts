/* beautify ignore:start */
import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {ItemListComponent} from './index';
/* beautify ignore:end */

describe('Component: ItemListComponent', () => {

            beforeEachProviders(() => []);

            it('should be defined', inject([TestComponentBuilder], (tcb) => {
                            return tcb.createAsync(ItemListComponent)
                                .then((fixture) => {
                                        let element = fixture.debugElement.nativeElement;
                                        let cmpInstance = <ItemListComponent>fixture.debugElement.componentInstance;
                fixture.detectChanges();

                expect(cmpInstance).toBeDefined();
                expect(element).toBeDefined();
            });
    }));

});