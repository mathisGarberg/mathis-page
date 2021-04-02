import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import {
  ActionSettingsChangeLanguage,
  ActionSettingsChangeTheme,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeOperatingSystemMode,
  ActionSettingsChangeStickyHeader,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAnimationElements
} from '@core/states/settings/settings.actions';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@core/animations/route.animations';

import { selectSettingsState } from '@core/states/settings/settings.selectors';
import { SettingsState } from '@core/states/settings/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  settings$: Observable<SettingsState>;

  themes = [
    { value: 'DEFAULT-THEME', label: 'blue' },
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' },
    { value: 'HACKER-THEME', label: 'hacker' }
  ];

  languages = [
    { value: 'en', label: 'en' },
    { value: 'no', label: 'no' }
  ];

  constructor(private store: Store<SettingsState>) {}

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettingsState));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(ActionSettingsChangeLanguage({ language }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(ActionSettingsChangeTheme({ theme }));
  }

  onAutoNightModeToggle({ checked: isAutoNightMode }) {
    this.store.dispatch(ActionSettingsChangeAutoNightMode({ isAutoNightMode }));
  }

  onOperatingSystemModeToggle({ checked: isOperatingSystemMode }) {
    this.store.dispatch(
      ActionSettingsChangeOperatingSystemMode({
        isOperatingSystemMode
      })
    );
  }

  onStickyHeaderToggle({ checked: isStickyHeader }) {
    this.store.dispatch(ActionSettingsChangeStickyHeader({ isStickyHeader }));
  }

  onPageAnimationsToggle({ checked: hasPageAnimations }) {
    this.store.dispatch(
      ActionSettingsChangeAnimationsPage({
        hasPageAnimations
      })
    );
  }

  onElementsAnimationsToggle({ checked: hasElementsAnimations }) {
    this.store.dispatch(
      ActionSettingsChangeAnimationElements({
        hasElementsAnimations
      })
    );
  }
}
