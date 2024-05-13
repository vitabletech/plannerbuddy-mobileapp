import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { LIGHT_THEME_COLORS, DARK_THEME_COLORS } from './Colors';

export const themes = {
  light: {
    ...MD3LightTheme,
    ...LIGHT_THEME_COLORS,
  },
  dark: {
    ...MD3DarkTheme,
    ...DARK_THEME_COLORS,
  },
};
