import { createAction, props } from '@ngrx/store';
import { Language } from './settings.model';

export const ActionSettingsChangeLanguage = createAction(
  '[Settings] Change Language',
  props<{ language: Language }>()
);

export const ActionSettingsChangeTheme = createAction(
  '[Settings] Change Theme',
  props<{ theme: string }>()
);

export const ActionSettingsChangeAutoNightMode = createAction(
  '[Settings] Change Auto Night Mode',
  props<{ isAutoNightMode: boolean }>()
);

export const ActionSettingsChangeStickyHeader = createAction(
  '[Settings] Change Sticky Header',
  props<{ isStickyHeader: boolean }>()
);

export const ActionSettingsChangeAnimationsPageDisabled = createAction(
  '[Settings] Change Animation Page Disabled',
  props<{ isPageAnimationsDisabled: boolean }>()
);

export const ActionSettingsChangeAnimationsPage = createAction(
  '[Settings] Change Animation Page',
  props<{ hasPageAnimations: boolean }>()
);

export const ActionSettingsChangeAnimationElements = createAction(
  '[Settings] Change Animation Elements',
  props<{ hasElementsAnimations: boolean }>()
);

export const ActionSettingsChangeHour = createAction(
  '[Settings] Change Hour',
  props<{ hour: number }>()
);

export const ActionSettingsChangeOperatingSystemMode = createAction(
  '[Settings] Change operating system mode',
  props<{ isOperatingSystemMode: boolean }>()
);
