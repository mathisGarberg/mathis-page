import { NIGHT_MODE_THEME } from './settings.model';
import {
  ActionSettingsChangeAnimationElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeHour,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeOperatingSystemMode,
  ActionSettingsChangeStickyHeader,
  ActionSettingsChangeTheme,
} from './settings.actions';

describe('Settings Actions', () => {
  describe('[Settings] Change Theme', () => {
    it('should create ActionSettingsChangeTheme action', () => {
      const action = ActionSettingsChangeTheme({
        theme: NIGHT_MODE_THEME,
      });

      expect(action.type).toEqual(ActionSettingsChangeTheme.type);
      expect(action.theme).toEqual(NIGHT_MODE_THEME);
    });
  });

  describe('[Settings] Change Animation Elements', () => {
    it('should create ActionSettingsChangeAnimationElements action', () => {
      const action = ActionSettingsChangeAnimationElements({
        hasElementsAnimations: true,
      });

      expect(action.type).toEqual(ActionSettingsChangeAnimationElements.type);
      expect(action.hasElementsAnimations).toEqual(true);
    });
  });

  describe('[Settings] Change Animations Page', () => {
    it('should create ActionSettingsChangeAnimationsPage action', () => {
      const action = ActionSettingsChangeAnimationsPage({
        hasPageAnimations: true,
      });

      expect(action.type).toEqual(ActionSettingsChangeAnimationsPage.type);
      expect(action.hasPageAnimations).toEqual(true);
    });
  });

  describe('[Settings] Change Animation Page Disabled', () => {
    it('should create ActionSettingsChangeAnimationsPageDisabled action', () => {
      const action = ActionSettingsChangeAnimationsPageDisabled({
        isPageAnimationsDisabled: true,
      });

      expect(action.type).toEqual(
        ActionSettingsChangeAnimationsPageDisabled.type
      );
      expect(action.isPageAnimationsDisabled).toEqual(true);
    });
  });

  describe('[Settings] Change Auto Night Mode', () => {
    it('should create ActionSettingsChangeAutoNightMode action', () => {
      const action = ActionSettingsChangeAutoNightMode({
        isAutoNightMode: true,
      });

      expect(action.type).toEqual(ActionSettingsChangeAutoNightMode.type);
      expect(action.isAutoNightMode).toEqual(true);
    });
  });

  describe('[Settings] Change Language', () => {
    it('should create ActionSettingsChangeLanguage action', () => {
      const action = ActionSettingsChangeLanguage({
        language: 'en',
      });

      expect(action.type).toEqual(ActionSettingsChangeLanguage.type);
      expect(action.language).toEqual('en');
    });
  });

  describe('[Settings] Change Sticky Header', () => {
    it('should create ActionSettingsChangeStickyHeader action', () => {
      const action = ActionSettingsChangeStickyHeader({
        isStickyHeader: true,
      });

      expect(action.type).toEqual(ActionSettingsChangeStickyHeader.type);
      expect(action.isStickyHeader).toEqual(true);
    });
  });

  describe('[Settings] Change Hour', () => {
    it('should create ActionSettingsChangeHour action', () => {
      const action = ActionSettingsChangeHour({
        hour: 7,
      });

      expect(action.type).toEqual(ActionSettingsChangeHour.type);
      expect(action.hour).toEqual(7);
    });
  });

  describe('[Settings] Change operating system mode', () => {
    it('should create ActionSettingsChangeOperatingSystemMode action', () => {
      const action = ActionSettingsChangeOperatingSystemMode({
        isOperatingSystemMode: true,
      });

      expect(action.type).toEqual(ActionSettingsChangeOperatingSystemMode.type);
      expect(action.isOperatingSystemMode).toEqual(true);
    });
  });
});
