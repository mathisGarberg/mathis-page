import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SharedModule } from './shared.module';

describe(`SharedModule`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule]
    });
  });

  it(`should provide 'Store' service`, () => {
    expect(() => TestBed.inject(Store)).toBeTruthy();
  });
});
