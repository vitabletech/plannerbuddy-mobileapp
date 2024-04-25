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

export const DRAWER_SCREEN = [
  {
    name: 'tabs',
    drawerLabel: 'Home',
    headerTitle: 'Home',
    icon: { lib: 'Ionicons', name: 'home' },
    headerShown: false,
  },
  {
    name: 'profile',
    drawerLabel: 'Profile',
    headerTitle: 'Profile',
    icon: { lib: 'MaterialCommunityIcons', name: 'face-man-profile' },
  },
  {
    name: 'ViewGuests',
    drawerLabel: 'Guest Lists',
    headerTitle: 'Guest Lists',
    icon: { lib: 'Ionicons', name: 'person-outline' },
  },
  {
    name: 'help',
    drawerLabel: 'Chat Support',
    headerTitle: 'Chat Support',
    icon: { lib: 'MaterialIcons', name: 'support-agent' },
  },
];

export const ON_SHARE_APP_MESSAGE = `Check out this awesome app: https://play.google.com/store/apps/details?id=${AppConfig.expo.scheme}`;
