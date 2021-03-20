import * as assert from 'assert';
import { Actions } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { SettingsEffects, SETTINGS_KEY } from './settings.effects';
import {
  LIGHT_MODE_THEME,
  NIGHT_MODE_THEME,
  SettingsState,
} from './settings.model';
import {
  ActionSettingsChangeAnimationElements,
  ActionSettingsChangeTheme,
} from './settings.actions';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { AnimationsService } from '../../animations/animations.service';
import { skip } from 'rxjs/operators';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('SettingsEffects', () => {
  let router: any;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let overlayContainer: jasmine.SpyObj<OverlayContainer>;
  let animationsService: jasmine.SpyObj<AnimationsService>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let store: jasmine.SpyObj<Store<SettingsState>>;
  let ngZone: jasmine.SpyObj<NgZone>;

  const initialSettingsState: SettingsState = {
    language: 'en',
    theme: LIGHT_MODE_THEME,
    isAutoNightMode: false,
    isOperatingSystemMode: false,
    nightTheme: NIGHT_MODE_THEME,
    lightTheme: LIGHT_MODE_THEME,
    isStickyHeader: true,
    hasPageAnimations: true,
    isPageAnimationsDisabled: false,
    hasElementsAnimations: true,
    hour: 0,
  };

  beforeEach(() => {
    router = {
      routerState: {
        snapshot: {},
      },
      events: {
        pipe() {},
      },
    };
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'setItem',
    ]);
    overlayContainer = jasmine.createSpyObj('OverlayContainer', [
      'getContainerElement',
    ]);
    animationsService = jasmine.createSpyObj('AnimationsService', [
      'updateRouteAnimationType',
    ]);
    translateService = jasmine.createSpyObj('TranslateService', ['use']);
    store = jasmine.createSpyObj('store', ['pipe']);
    ngZone = jasmine.createSpyObj('mockNgZone', ['run', 'runOutsideAngular']);
    ngZone.run.and.callFake((fn) => fn());
  });

  describe('PersistSettings$', () => {
    it('should call method on LocalStorageService for PERSIST actions', () => {
      scheduler.run(({ cold }) => {
        store.pipe.and.returnValue(of(initialSettingsState));

        const persistAction = ActionSettingsChangeTheme({ theme: 'DEFAULT' });
        const source = cold('a', { a: persistAction });
        const actions = new Actions(source);
        const effects = new SettingsEffects(
          actions,
          store,
          overlayContainer,
          localStorageService,
          animationsService,
          translateService,
          ngZone
        );

        effects.PersistSettings$.subscribe(() => {
          expect(localStorageService.setItem).toHaveBeenCalledWith(
            SETTINGS_KEY,
            initialSettingsState
          );
        });
      });
    });
  });

  describe('UpdateRouteAnimationType$', () => {
    it('should call method on AnimationService for ANIMATION actions', () => {
      scheduler.run(({ cold }) => {
        store.pipe.and.returnValue(of(true));

        const animationAction = ActionSettingsChangeAnimationElements({
          hasElementsAnimations: false,
        });
        const source = cold('a', { a: animationAction });
        const actions = new Actions(source);
        const effects = new SettingsEffects(
          actions,
          store,
          overlayContainer,
          localStorageService,
          animationsService,
          translateService,
          ngZone
        );

        effects.UpdateRouteAnimationType$.pipe(skip(1)).subscribe(
          ([action]) => {
            expect(action).toEqual({
              hasElementsAnimations: false,
              type: '[Settings] Change Animation Elements',
            });
            expect(
              animationsService.updateRouteAnimationType
            ).toHaveBeenCalled();
          }
        );
      });
    });
  });
});
