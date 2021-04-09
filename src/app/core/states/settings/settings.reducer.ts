import { createReducer, on } from '@ngrx/store';

import {
  ActionSettingsChangeAnimationElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeHour,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeStickyHeader,
  ActionSettingsChangeTheme,
  ActionSettingsChangeOperatingSystemMode
} from './settings.actions';
import {
  LIGHT_MODE_THEME,
  NIGHT_MODE_THEME,
  SettingsState
} from './settings.model';

export const initialSettingsState: SettingsState = {
  language: 'en',
  theme: 'LIGHT-THEME',
  isAutoNightMode: false,
  isOperatingSystemMode: false,
  isStickyHeader: true,
  hasPageAnimations: true,
  isPageAnimationsDisabled: false,
  hasElementsAnimations: true,
  nightTheme: NIGHT_MODE_THEME,
  lightTheme: LIGHT_MODE_THEME,
  hour: 0
};

export const settingsReducer = createReducer(
  initialSettingsState,
  on(
    ActionSettingsChangeLanguage,
    ActionSettingsChangeTheme,
    ActionSettingsChangeStickyHeader,
    ActionSettingsChangeAnimationsPage,
    ActionSettingsChangeAnimationElements,
    ActionSettingsChangeHour,
    ActionSettingsChangeOperatingSystemMode,
    (state, action) => ({ ...state, ...action })
  ),
  on(
    ActionSettingsChangeAnimationsPageDisabled,
    (state, { isPageAnimationsDisabled }) => ({
      ...state,
      isPageAnimationsDisabled,
      hasPageAnimations: false
    })
  ),
  on(ActionSettingsChangeAutoNightMode, (state, { isAutoNightMode }) => ({
    ...state,
    isOsMode: false,
    isAutoNightMode
  }))
);
