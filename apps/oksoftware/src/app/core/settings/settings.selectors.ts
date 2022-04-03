import { createSelector } from '@ngrx/store';

import { SettingsState } from './settings.model';
import { selectSettingsState } from '../core.state';

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectSettingsStickyHeader = createSelector(
  selectSettings,
  (state: SettingsState) => state.stickyHeader
);

export const selectSettingsLanguage = createSelector(
  selectSettings,
  (state: SettingsState) => state.language
);

export const selectTheme = createSelector(
  selectSettings,
  (settings: SettingsState) => settings.theme
);

export const selectPageAnimations = createSelector(
  selectSettings,
  (settings: SettingsState) => settings.pageAnimations
);

export const selectElementsAnimations = createSelector(
  selectSettings,
  (settings: SettingsState) => settings.elementsAnimations
);

export const selectAutoNightMode = createSelector(
  selectSettings,
  (settings: SettingsState) => settings.autoNightMode
);

export const selectNightTheme = createSelector(
  selectSettings,
  (settings: SettingsState) => settings.nightTheme
);

export const selectHour = createSelector(
  selectSettings,
  (settings: SettingsState) => settings.hour
);

export const selectIsNightHour = createSelector(
  selectAutoNightMode,
  selectHour,
  (autoNightMode: boolean, hour: number) =>
    autoNightMode && (hour >= 21 || hour <= 7)
);
