import { Injectable, NgZone } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, merge, of } from 'rxjs';
import { tap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { AnimationsService } from '../../animations/animations.service';
import {
  selectEffectiveTheme,
  selectSettingsState,
  selectPageAnimations,
  selectElementsAnimations,
  selectSettingsLanguage,
} from './settings.selectors';
import { SettingsState } from './settings.model';
import {
  ActionSettingsChangeAnimationElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeOperatingSystemMode,
  ActionSettingsChangeStickyHeader,
  ActionSettingsChangeTheme,
} from './settings.actions';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('app-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  hour = 0;
  // changeHour = this.ngZone.runOutsideAngular(() =>
  //   setInterval(() => {
  //     const hour = new Date().getHours();
  //     if (hour !== this.hour) {
  //       this.hour = hour;
  //       this.ngZone.run(() =>
  //         this.store.dispatch(settingsChangeHour({ hour }))
  //       );
  //     }
  //   }, 60_000)
  // );

  PersistSettings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ActionSettingsChangeAnimationElements,
          ActionSettingsChangeAnimationsPage,
          ActionSettingsChangeAnimationsPageDisabled,
          ActionSettingsChangeAutoNightMode,
          ActionSettingsChangeOperatingSystemMode,
          ActionSettingsChangeLanguage,
          ActionSettingsChangeStickyHeader,
          ActionSettingsChangeTheme
        ),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([, settings]) =>
          this.localStorageService.setItem(SETTINGS_KEY, settings)
        )
      ),
    { dispatch: false }
  );

  UpdateRouteAnimationType$ = createEffect(
    () =>
      merge(
        INIT,
        this.actions$.pipe(
          ofType(
            ActionSettingsChangeAnimationElements,
            ActionSettingsChangeAnimationsPage
          )
        )
      ).pipe(
        withLatestFrom(
          combineLatest([
            this.store.pipe(select(selectPageAnimations)),
            this.store.pipe(select(selectElementsAnimations)),
          ])
        ),
        tap(([, [pageAnimations, elementsAnimations]]) =>
          this.animationsService.updateRouteAnimationType(
            pageAnimations,
            elementsAnimations
          )
        )
      ),
    { dispatch: false }
  );

  UpdateTheme$ = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(ActionSettingsChangeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectEffectiveTheme))),
        tap(console.log),
        tap(([, effectiveTheme]) => {
          const classList = this.overlayContainer.getContainerElement()
            .classList;
          const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
          );
          if (toRemove.length) {
            classList.remove(...toRemove);
          }
          classList.add(effectiveTheme);
        })
      ),
    { dispatch: false }
  );

  SetTranslateServiceLanguage$ = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingsLanguage),
        distinctUntilChanged(),
        tap((language) => this.translateService.use(language))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<SettingsState>,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private animationsService: AnimationsService,
    private translateService: TranslateService,
    private ngZone: NgZone
  ) {}
}
