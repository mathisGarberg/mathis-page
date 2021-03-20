import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SettingsState } from './settings.model';

export const selectSettingsState = createFeatureSelector<SettingsState>(
  'settings'
);

export const selectSettingsStickyHeader = createSelector(
  selectSettingsState,
  (settingsState: SettingsState) => settingsState.isStickyHeader
);

export const selectSettingsLanguage = createSelector(
  selectSettingsState,
  (settingsState: SettingsState) => settingsState.language
);

export const selectTheme = createSelector(
  selectSettingsState,
  (settingsState: SettingsState) => settingsState.theme
);

export const selectPageAnimations = createSelector(
  selectSettingsState,
  (settingsState: SettingsState) => settingsState.hasPageAnimations
);

export const selectElementsAnimations = createSelector(
  selectSettingsState,
  (settingsState: SettingsState) => settingsState.hasElementsAnimations
);

export const selectAutoNightMode = createSelector(
  selectSettingsState,
  (settingsState: SettingsState) => settingsState.isAutoNightMode
);

export const selectNightTheme = createSelector(
  selectSettingsState,
  (settingsState: SettingsState) => settingsState.nightTheme
);

export const selectLightTheme = createSelector(
  selectSettingsState,
  (settingsState: SettingsState) => settingsState.lightTheme
);

export const selectHour = createSelector(
  selectSettingsState,
  (settingsState: SettingsState) => settingsState.hour
);

export const selectNightHour = createSelector(
  selectAutoNightMode,
  selectHour,
  (isAutoNightMode: boolean, hour: number) =>
    isAutoNightMode && (hour >= 21 || hour <= 7)
);

export const selectOperatingSystemMode = createSelector(
  selectSettingsState,
  (state: SettingsState) => state.isOperatingSystemMode
);

export const selectEffectiveTheme = createSelector(
  selectTheme,
  selectNightTheme,
  selectLightTheme,
  selectNightHour,
  selectOperatingSystemMode,
  (
    theme: string,
    nightTheme: string,
    lightTheme: string,
    isNightHour: boolean,
    isOsMode: boolean
  ) => {
    if (isOsMode) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return nightTheme.toLowerCase();
      }
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return lightTheme.toLowerCase();
      }
    }
    return (isNightHour ? nightTheme : theme).toLowerCase();
  }
);
