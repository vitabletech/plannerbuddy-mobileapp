import React from 'react';
import { TouchableOpacity, View, Share } from 'react-native';
import { ActivityIndicator, Avatar, IconButton } from 'react-native-paper';
import { iconLibraries, ON_SHARE_APP_MESSAGE } from './constant';
import { API_URL } from '../constants/constants';
import VTAlert from '../components/VTAlert/VTAlert';

export const IconComponent = (lib, iconName, size, color) => {
  const Component = iconLibraries[lib];
  if (!Component) {
    throw new Error(`Icon library ${lib} is not supported.`);
  }
  return <Component name={iconName} size={size} color={color} />;
};

export const HeaderLeft = (action, lib, icon, size, color) => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{ marginLeft: 15, marginRight: 15 }}>
    <TouchableOpacity onPress={action}>{IconComponent(lib, icon, size, color)}</TouchableOpacity>
  </View>
);
export const Loader = () => <ActivityIndicator />;
export const ItemSeparatorComponent = (styles) => <View style={styles} />;

export const onShare = async () => {
  try {
    await Share.share({ message: ON_SHARE_APP_MESSAGE });
  } catch (error) {
    alert(error.message);
  }
};

export const AvatarIcon = (icon, props) => <Avatar.Icon icon={icon} {...props} />;
export const AvatarText = (props) => <Avatar.Icon {...props} />;

export const renderIconButton = (buttonProps) => <IconButton {...buttonProps} />;

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

export const fetchUserDetails = () => {
  const person = {
    name: 'Pankaj Saini',
    email: 'abc@xyz.com',
    address: 'abcabcabcabc',
    contact: '1231231234',
  };
  return person;
};
export const fetchEventDetails = () => {
  const events = {
    id: '',
    name: '',
    address: '',
    date: '',
    guests: [],
  };
  return events;
};

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
];

export const fetchUsers = async (page) => {
  const response = await fetch(`${API_URL}users?skip=${page}&limit=10`);
  const data = await response.json();
  return data;
};

export const AlertComponent = (error) => <VTAlert isVisible={error !== null} body={error} />;
