import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import { LIGHT_THEME_COLORS, DARK_THEME_COLORS } from './Colors';
import fontConfig from './Fonts';

export const themes = {
  light: {
    ...MD3LightTheme,
    ...LIGHT_THEME_COLORS,
    fonts: configureFonts({ config: fontConfig, isV3: true }),
  },
  dark: {
    ...MD3DarkTheme,
    ...DARK_THEME_COLORS,
    fonts: configureFonts({ config: fontConfig, isV3: true }),
  },
};
