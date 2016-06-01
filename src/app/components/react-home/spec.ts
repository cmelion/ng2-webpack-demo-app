import {
  it,
  fit,
  inject,
  describe,
  ddescribe,
  beforeEachProviders,
} from '@angular/core/testing';

// Load the implementations that should be tested
import {ReactHome} from './index.async';

describe('React Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    ReactHome
  ]);

  it('should log ngOnInit', inject([ReactHome], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalledWith('Hello React Home');
  }));

});
