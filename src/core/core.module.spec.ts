import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CoreModule } from './core.module';

describe(`CoreModule`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
    });
  });

  it(`should provide 'Store' service`, () => {
    expect(() => TestBed.inject(Store)).toBeTruthy();
  });
});
