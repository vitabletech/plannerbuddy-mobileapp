import {
  Ionicons,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  Zocial,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
} from '@expo/vector-icons';
import AppConfig from '../../app.json';

export const iconLibraries = {
  Ionicons,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  Zocial,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
};

export const ON_SHARE_APP_MESSAGE = `Check out this awesome app: https://play.google.com/store/apps/details?id=${AppConfig.expo.scheme}`;
export const ASK_RATING = `https://play.google.com/store/apps/details?id=${AppConfig.expo.scheme}`;
export const APP_INTERACTIONS_KEY = 'appInteractions';
export const RATING_THRESHOLD = 5; // Number of interactions before showing the rating prompt
