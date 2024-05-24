import React from 'react';
import { TouchableOpacity, View, Share, Alert, Linking } from 'react-native';
import { ActivityIndicator, Avatar, IconButton, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  iconLibraries,
  ON_SHARE_APP_MESSAGE,
  ASK_RATING,
  APP_INTERACTIONS_KEY,
  RATING_THRESHOLD,
} from './constant';
import VTAlert from '../components/VTAlert/VTAlert';

/**
 * Renders an icon component based on the specified library, icon name, size, and color.
 *
 * @param {string} lib - The library name of the icon component.
 * @param {string} iconName - The name of the icon.
 * @param {number} size - The size of the icon.
 * @param {string} color - The color of the icon.
 * @returns {JSX.Element} The rendered icon component.
 * @throws {Error} If the specified icon library is not supported.
 */
export const IconComponent = (lib, iconName, size, color) => {
  const Component = iconLibraries[lib];
  if (!Component) {
    throw new Error(`Icon library ${lib} is not supported.`);
  }
  return <Component name={iconName} size={size} color={color} />;
};

/**
 * Represents the HeaderLeft component.
 *
 * @param {function} action - The action to be performed on press.
 * @param {string} lib - The library name for the icon component.
 * @param {string} icon - The icon name for the icon component.
 * @param {number} size - The size of the icon.
 * @param {string} color - The color of the icon.
 * @returns {React.Component} The rendered HeaderLeft component.
 */
export const HeaderLeft = (action, lib, icon, size, color) => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{ marginLeft: 15, marginRight: 15 }}>
    <TouchableOpacity onPress={action}>{IconComponent(lib, icon, size, color)}</TouchableOpacity>
  </View>
);

/**
 * Function to share a message using the Share API.
 * @async
 * @function onShare
 * @returns {Promise<void>} A promise that resolves when the sharing is complete.
 */
export const onShare = async () => {
  try {
    await Share.share({ message: ON_SHARE_APP_MESSAGE });
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

/**
 * Formats a given date into a string representation.
 *
 * @param {string|number|Date} date - The date to be formatted.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * Prompts the user to rate the app and stores the user's response.
 * @returns {Promise<void>} A promise that resolves when the user's response is stored.
 */
export const askForRating = async () => {
  Alert.alert('Rate Us', 'Please rate us on Play Store', [
    {
      text: 'Rate Us',
      onPress: async () => {
        Linking.openURL(ASK_RATING).catch(() => Alert.alert('Error', 'Could not open Play Store.'));
        // Don't ask again if user clicked on Rate Us
        await AsyncStorage.setItem('ASK_RATING_AGAIN', 'false');
      },
    },
    {
      text: 'Later',
      onPress: async () => {
        // Ask again later if user clicked on Later
        await AsyncStorage.setItem('ASK_RATING_AGAIN', 'true');
      },
    },
    {
      text: 'No',
      onPress: async () => {
        // Don't ask again if user clicked on No
        await AsyncStorage.setItem('ASK_RATING_AGAIN', 'false');
      },
    },
  ]);
};
/**
 * Increments the interaction count and checks if it has reached the rating threshold.
 * If the threshold is reached, it prompts the user for a rating and resets the count.
 * @returns {Promise<void>} A promise that resolves when the interaction count is updated.
 */
export const incrementInteractionCount = async () => {
  try {
    const interactions = await AsyncStorage.getItem(APP_INTERACTIONS_KEY);
    const count = interactions ? parseInt(interactions, 10) : 0;
    const newCount = count + 1;
    await AsyncStorage.setItem(APP_INTERACTIONS_KEY, newCount.toString());
    const askRatingAgain = await AsyncStorage.getItem('ASK_RATING_AGAIN');
    if (newCount >= RATING_THRESHOLD && askRatingAgain !== 'false') {
      await askForRating();
      await AsyncStorage.setItem(APP_INTERACTIONS_KEY, '0'); // Reset the count after showing the prompt
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to update interaction count');
  }
};

/**
 * Array of setting actions.
 * @typedef {Object} SettingAction
 * @property {string} icon - The icon name.
 * @property {string} label - The label for the action.
 * @property {Function} onPress - The function to be called when the action is pressed.
 */
export const SETTING_ACTIONS = (navigation) => [
  {
    icon: 'chat',
    label: 'Chat Support',
    onPress: () => navigation.navigate('help'),
  },
  {
    icon: 'share',
    label: 'Share App',
    onPress: () => onShare(),
  },
  {
    icon: 'star',
    label: 'Rate Us',
    onPress: () =>
      Linking.openURL(ASK_RATING).catch(() => Alert.alert('Error', 'Could not open Play Store.')),
  },
];

/**
 * Displays an alert dialog with a confirmation message.
 *
 * @param {string} title - The title of the alert dialog.
 * @param {string} message - The message to display in the alert dialog.
 * @param {Function} onConfirm - The function to be called when the user confirms the action.
 */
export const askForConfirmation = (title, message, onConfirm) => {
  Alert.alert(title, message, [
    {
      text: 'No',
      onPress: () => {},
    },
    {
      text: 'Yes',
      onPress: onConfirm,
    },
  ]);
};

export const AlertComponent = (error) => <VTAlert isVisible={error !== null} body={error} />;

export const endReached = (getStyles) => <Text style={{ ...getStyles }}>End Of The List</Text>;

export const AvatarIcon = (icon, props) => <Avatar.Icon icon={icon} {...props} />;

export const AvatarText = (props) => <Avatar.Text {...props} />;

export const renderIconButton = (buttonProps) => <IconButton {...buttonProps} />;

export const Loader = () => <ActivityIndicator />;

export const ItemSeparatorComponent = (styles) => <View style={styles} />;
