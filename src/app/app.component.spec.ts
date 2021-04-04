import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingComponent } from './scrolling/scrolling.component';
import { ConnectComponent } from './connect/connect.component';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslateModule } from '@ngx-translate/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAuthState } from './core/core.state';
import { initialAuthState } from './core/states/auth/auth.reducer';
import {
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from './core/states/settings/settings.selectors';

import { SharedModule } from '@shared/shared.module';
import { AppComponent } from './app.component';

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
        MatOptionModule,
        MatTooltipModule,
        MatIconModule,
        SharedModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        ConnectComponent,
        ScrollingComponent
      ],
      providers: [provideMockStore()]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');

    store.overrideSelector(selectSettingsStickyHeader, true);
    store.overrideSelector(selectSettingsLanguage, 'en');
    store.overrideSelector(selectEffectiveTheme, 'LIGHT-THEME');
    store.overrideSelector(selectAuthState, {
      ...initialAuthState,
      isAuthenticated: false
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
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

  it('should call onWindowScroll method on scroll', () => {
    const sidenavContent = fixture.nativeElement.querySelector(
      '.sidenav-content'
    );

    sidenavContent.dispatchEvent(new Event('scroll'));

    fixture.detectChanges();
  });
});
