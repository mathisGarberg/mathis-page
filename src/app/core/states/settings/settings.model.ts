export const NIGHT_MODE_THEME = 'DARK-THEME';
export const LIGHT_MODE_THEME = 'LIGHT-THEME';

export type Language = 'en' | 'no';

export interface SettingsState {
  language: string;
  theme: string;
  isAutoNightMode: boolean;
  isOperatingSystemMode: boolean;
  nightTheme: string;
  lightTheme: string;
  isStickyHeader: boolean;
  hasPageAnimations: boolean;
  isPageAnimationsDisabled: boolean;
  hasElementsAnimations: boolean;
  hour: number;
}
