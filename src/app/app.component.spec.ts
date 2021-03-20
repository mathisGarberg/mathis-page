import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/shared/shared.module';
import { AppComponent } from './app.component';
import { selectAuthState } from './core/core.state';
import {
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader,
} from './core/states/settings/settings.selectors';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        NoopAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        SharedModule,
      ],
      declarations: [AppComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');

    store.overrideSelector(selectSettingsStickyHeader, true);
    store.overrideSelector(selectSettingsLanguage, 'en');
    store.overrideSelector(selectEffectiveTheme, 'LIGHT-THEME');
    store.overrideSelector(selectAuthState, null);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it(`should be using chrome`, () => {
    expect(AppComponent.isIEorEdgeOrSafari()).toBeFalsy();
  });

  it('should dispatch the logout action', () => {
    component.onLogoutClick();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.calls.mostRecent().args[0].type).toBe('[Auth] Logout');
  });

  it('should dispatch the change language action', () => {
    component.onLanguageSelect({ value: 'en' });

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.calls.mostRecent().args[0].type).toBe(
      '[Settings] Change Language'
    );
  });

  // it('should call onWindowScroll method on scroll', () => {
  //   spyOn(component, 'onWindowScroll').and.callThrough();

  //   const debugElement = fixture.debugElement.query(By.css('#sidenav-content'));

  //   debugElement.triggerEventHandler('scroll', {
  //     target: {
  //       scrollHeight: 100,
  //       scrollTop: 0,
  //       clientHeight: 0,
  //     },
  //   });

  //   expect(component.onWindowScroll).toHaveBeenCalled();
  // });
});
