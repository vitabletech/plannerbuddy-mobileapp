import * as Font from 'expo-font';
import GilroyRegular from '../assets/fonts/Gilroy-Regular.ttf';
import GilroyMedium from '../assets/fonts/Gilroy-Medium.ttf';
import GilroyLight from '../assets/fonts/Gilroy-Light.ttf';
import GilroyThin from '../assets/fonts/Gilroy-Thin.ttf';

const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'Gilroy-Regular': GilroyRegular,
      'Gilroy-Medium': GilroyMedium,
      'Gilroy-Light': GilroyLight,
      'Gilroy-Thin': GilroyThin,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error loading fonts', error);
  }
};

export default loadFonts;
