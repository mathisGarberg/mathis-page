import {
  ActionSettingsChangeAnimationElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeHour,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeStickyHeader,
  ActionSettingsChangeTheme,
} from './settings.actions';
import {
  LIGHT_MODE_THEME,
  NIGHT_MODE_THEME,
  SettingsState,
} from './settings.model';
import { initialSettingsState, settingsReducer } from './settings.reducer';

describe('SettingsReducer', () => {
  const TEST_SETTINGS_STATE: SettingsState = {
    language: 'no',
    theme: 'LIGHT-THEME',
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

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = settingsReducer(undefined, action);

      expect(state).toBe(initialSettingsState);
    });
  });

  describe('[Settings] Change Language', () => {
    it('should update change language setting', () => {
      const action = ActionSettingsChangeLanguage({ language: 'en' });
      const state = settingsReducer(TEST_SETTINGS_STATE, action);

      expect(state.language).toBe('en');
    });
  });

  describe('[Settings] Change Theme', () => {
    it('should update change theme setting', () => {
      const action = ActionSettingsChangeTheme({ theme: NIGHT_MODE_THEME });
      const state = settingsReducer(TEST_SETTINGS_STATE, action);

      expect(state.theme).toBe(NIGHT_MODE_THEME);
    });
  });

  describe('[Settings] Change Auto Night Mode', () => {
    it('should update change auto night mode', () => {
      const action = ActionSettingsChangeAutoNightMode({
        isAutoNightMode: true,
      });
      const state = settingsReducer(TEST_SETTINGS_STATE, action);

      expect(state.isAutoNightMode).toBe(true);
    });
  });

  describe('[Settings] Change Sticky Header', () => {
    it('should update change sticky header', () => {
      const action = ActionSettingsChangeStickyHeader({ isStickyHeader: true });
      const state = settingsReducer(TEST_SETTINGS_STATE, action);

      expect(state.isStickyHeader).toBe(true);
    });
  });

  describe('[Settings] Change Animation Page', () => {
    it('should update change animations page', () => {
      const action = ActionSettingsChangeAnimationsPage({
        hasPageAnimations: true,
      });
      const state = settingsReducer(TEST_SETTINGS_STATE, action);

      expect(state.hasPageAnimations).toBe(true);
    });
  });

  describe('[Settings] Change Animation Page Disabled', () => {
    it('should update change animations page disabled', () => {
      const action = ActionSettingsChangeAnimationsPageDisabled({
        isPageAnimationsDisabled: true,
      });
      const state = settingsReducer(TEST_SETTINGS_STATE, action);

      expect(state.isPageAnimationsDisabled).toBe(true);
    });
  });

  describe('[Settings] Change Animation Elements', () => {
    it('should update change animation elements', () => {
      const action = ActionSettingsChangeAnimationElements({
        hasElementsAnimations: true,
      });
      const state = settingsReducer(TEST_SETTINGS_STATE, action);

      expect(state.hasElementsAnimations).toBeTrue();
    });
  });

  describe('[Settings] Change hour', () => {
    it('should update change hour setting', () => {
      const action = ActionSettingsChangeHour({ hour: 8 });
      const state = settingsReducer(TEST_SETTINGS_STATE, action);

      expect(state.hour).toBe(8);
    });
  });
});
