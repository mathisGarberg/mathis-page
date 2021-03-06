import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { provideMockStore } from '@ngrx/store/testing';
import {
  CardButtonComponent,
  CardButtonModule
} from './../scams/card-button/card-button.component';
import { CardComponent, CardModule } from './../scams/card/card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared/shared.module';
import { AboutComponent } from './about.component';
import { Input, Component } from '@angular/core';
import { CarouselModule } from '../scams/carousel/carousel.module';
import { CarouselComponent } from '../scams/carousel/carousel.component';

@Component({
  selector: 'app-mat-icon',
  template: '<span></span>'
})
class MockMatIconComponent {
  @Input() svgIcon: any;
  @Input() fontSet: any;
  @Input() fontIcon: any;
}

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        MatInputModule,
        MatCardModule,
        CardModule,
        CardButtonModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        CarouselModule
      ],
      declarations: [
        AboutComponent,
        CardComponent,
        CardButtonComponent,
        CarouselComponent
      ],
      providers: [provideMockStore()]
    })
      .overrideModule(MatIconModule, {
        remove: {
          declarations: [MatIcon],
          exports: [MatIcon]
        },
        add: {
          declarations: [MockMatIconComponent],
          exports: [MockMatIconComponent]
        }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
