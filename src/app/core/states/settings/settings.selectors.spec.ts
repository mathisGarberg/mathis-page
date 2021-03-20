import { LIGHT_MODE_THEME, NIGHT_MODE_THEME } from './settings.model';
import {
  selectAutoNightMode,
  selectEffectiveTheme,
  selectElementsAnimations,
  selectHour,
  selectLightTheme,
  selectNightHour,
  selectNightTheme,
  selectOperatingSystemMode,
  selectPageAnimations,
  selectSettingsLanguage,
  selectSettingsState,
  selectSettingsStickyHeader,
  selectTheme
} from './settings.selectors';

const createState = ({
  isOperatingSystemMode = false,
  language = 'en',
  theme = 'LIGHT-THEME',
  isAutoNightMode = false,
  nightTheme = NIGHT_MODE_THEME,
  lightTheme = LIGHT_MODE_THEME,
  isStickyHeader = true,
  hasPageAnimations = true,
  isPageAnimationsDisabled = false,
  hasElementsAnimations = true,
  hour = 8
} = {}) => ({
  settings: {
    language,
    theme,
    isAutoNightMode,
    isOperatingSystemMode,
    nightTheme,
    lightTheme,
    isStickyHeader,
    hasPageAnimations,
    isPageAnimationsDisabled,
    hasElementsAnimations,
    hour
  }
});

describe('Settings Selectors', () => {
  it('should select the settings state', () => {
    const state = createState();

    expect(selectSettingsState(state)).toEqual(state.settings);
  });

  it('should select the settings sticky header', () => {
    const state = createState();

    expect(selectSettingsStickyHeader(state)).toBeTrue();
  });

  it('should select the settings language', () => {
    const state = createState();

    expect(selectSettingsLanguage(state)).toBe('en');
  });

  it('should select the settings theme', () => {
    const state = createState();

    expect(selectTheme(state)).toBe(state.settings.theme);
  });

  it('should select the page animations', () => {
    const state = createState();

    expect(selectPageAnimations(state)).toBe(state.settings.hasPageAnimations);
  });

  it('should select elments animation', () => {
    const state = createState();

    expect(selectElementsAnimations(state)).toEqual(
      state.settings.hasElementsAnimations
    );
  });

  it('should select auto night mode', () => {
    const state = createState();

    expect(selectAutoNightMode(state)).toEqual(state.settings.isAutoNightMode);
  });

  it('should select night theme', () => {
    const state = createState();

    expect(selectNightTheme(state)).toBe(state.settings.nightTheme);
  });

  it('should select light theme', () => {
    const state = createState();

    expect(selectLightTheme(state)).toBe(state.settings.lightTheme);
  });

  it('should select hour', () => {
    const state = createState();

    expect(selectHour(state)).toBe(state.settings.hour);
  });

  it('should select is night hour', () => {
    const state = createState();

    expect(selectNightHour(state)).toBe(state.settings.isAutoNightMode);
  });

  it('should select is operating system mode', () => {
    const state = createState();

    expect(selectOperatingSystemMode(state)).toBe(
      state.settings.isOperatingSystemMode
    );
  });

  it('should select effective theme', () => {
    const state = createState({ isOperatingSystemMode: true });

    expect(selectEffectiveTheme(state)).toEqual('dark-theme');
  });

  it('should select effective theme', () => {
    const state = createState({ isOperatingSystemMode: false });

    expect(selectEffectiveTheme(state)).toEqual('light-theme');
  });
});
