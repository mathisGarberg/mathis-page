// import {
//   ActionSettingsChangeLanguage,
//   ActionSettingsChangeTheme,
//   ActionSettingsChangeAutoNightMode,
//   ActionSettingsChangeStickyHeader
// } from '@core/states/settings/settings.actions';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatListModule } from '@angular/material/list';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MockStore, provideMockStore } from '@ngrx/store/testing';
// import { TranslateModule } from '@ngx-translate/core';
// import { SettingsComponent } from './settings.component';

// import { SettingsState } from '@core/states/settings/settings.model';
// import { By } from '@angular/platform-browser';
// import { MemoizedSelector } from '@ngrx/store';
// import { MatIconModule } from '@angular/material/icon';
// import { SharedModule } from '@shared/shared.module';
// import { MatSelectModule } from '@angular/material/select';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import {
//   MatSlideToggle,
//   MatSlideToggleModule
// } from '@angular/material/slide-toggle';
// import { selectSettingsState } from '@core/states/settings/settings.selectors';
// import { MatTooltipModule } from '@angular/material/tooltip';

// describe('SettingsComponent', () => {
//   let component: SettingsComponent;
//   let fixture: ComponentFixture<SettingsComponent>;
//   let store: MockStore;
//   let mockSelectSettings: MemoizedSelector<{}, SettingsState>;

//   const getThemeSelectArrow = () =>
//     fixture.debugElement.queryAll(By.css('.mat-select-trigger'))[1];
//   const getSelectOptions = () =>
//     fixture.debugElement.queryAll(By.css('mat-option'));
//   let dispatchSpy;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         MatListModule,
//         MatToolbarModule,
//         MatCardModule,
//         MatFormFieldModule,
//         MatIconModule,
//         MatCardModule,
//         MatSelectModule,
//         MatSlideToggleModule,
//         MatFormFieldModule,
//         TranslateModule.forRoot(),
//         SharedModule,
//         NoopAnimationsModule,
//         MatTooltipModule
//       ],
//       declarations: [SettingsComponent],
//       providers: [provideMockStore()]
//     }).compileComponents();

//     store = TestBed.inject(MockStore);
//     mockSelectSettings = store.overrideSelector(
//       selectSettingsState,
//       {} as SettingsState
//     );
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SettingsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should dispatch change language action', () => {
//     dispatchSpy = spyOn(store, 'dispatch');

//     component.onLanguageSelect({ value: 'en' });

//     expect(dispatchSpy).toHaveBeenCalledTimes(1);
//     expect(dispatchSpy).toHaveBeenCalledWith(
//       ActionSettingsChangeLanguage({ language: 'en' })
//     );
//   });

//   it('should dispatch change the theme', () => {
//     dispatchSpy = spyOn(store, 'dispatch');

//     component.onThemeSelect({ value: 'DEFAULT-THEME' });

//     expect(dispatchSpy).toHaveBeenCalledTimes(1);
//     expect(dispatchSpy).toHaveBeenCalledWith(
//       ActionSettingsChangeTheme({ theme: 'DEFAULT-THEME' })
//     );
//   });

//   it('should dispatch change auto night mode', () => {
//     dispatchSpy = spyOn(store, 'dispatch');

//     component.onAutoNightModeToggle({ checked: true });

//     expect(dispatchSpy).toHaveBeenCalledTimes(1);
//     expect(dispatchSpy).toHaveBeenCalledWith(
//       ActionSettingsChangeAutoNightMode({
//         isAutoNightMode: true
//       })
//     );
//   });

//   it('should dispatch change sticky header on sticky header toggle', () => {
//     dispatchSpy = spyOn(store, 'dispatch');
//     const componentDebug = fixture.debugElement;
//     const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[0];

//     slider.triggerEventHandler('change', { checked: false });
//     fixture.detectChanges();

//     expect(dispatchSpy).toHaveBeenCalledTimes(1);
//     expect(dispatchSpy).toHaveBeenCalledWith(
//       ActionSettingsChangeStickyHeader({ isStickyHeader: false })
//     );
//   });

//   it('should dispatch change theme action on theme selection', () => {
//     dispatchSpy = spyOn(store, 'dispatch');
//     getThemeSelectArrow().triggerEventHandler('click', {});

//     fixture.detectChanges();

//     getSelectOptions()[1].triggerEventHandler('click', {});

//     fixture.detectChanges();

//     expect(dispatchSpy).toHaveBeenCalledTimes(1);
//     expect(dispatchSpy).toHaveBeenCalledWith(
//       ActionSettingsChangeTheme({ theme: 'LIGHT-THEME' })
//     );
//   });

//   it('should dispatch change auto night mode on night mode toggle', () => {
//     dispatchSpy = spyOn(store, 'dispatch');
//     const componentDebug = fixture.debugElement;
//     const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[1];

//     slider.triggerEventHandler('change', { checked: false });
//     fixture.detectChanges();

//     expect(dispatchSpy).toHaveBeenCalledTimes(1);
//   });
// });
