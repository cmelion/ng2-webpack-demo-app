import { provide } from '@angular/core';
import {
  it,
  fit,
  inject,
  describe,
  ddescribe,
  beforeEachProviders,
} from '@angular/core/testing';

// Load the implementations that should be tested
import {Home} from './index';
import {ItemsService} from '../../services/api/items';


class MockItemsService {
  public loadItems: string = 'Mocked Service';
}

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    Home,
    provide(ItemsService, {useClass: MockItemsService})
  ]);

  it('should log ngOnInit', inject([Home], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalledWith('Hello Home');
  }));

});
