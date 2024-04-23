import React from 'react';
import { Link } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { iconLibraries } from './constant';

export const IconComponent = (lib, iconName, size, color) => {
  const Component = iconLibraries[lib];
  if (!Component) {
    throw new Error(`Icon library ${lib} is not supported.`);
  }
  return <Component name={iconName} size={size} color={color} />;
};

export const HeaderRight = ({ action, icon, size }) => (
  <View style={{ marginLeft: 15, marginRight: 15 }}>
    <TouchableOpacity onPress={action}>{<Avatar.Icon size={size} icon={icon} />}</TouchableOpacity>
  </View>
);
export const HeaderLeft = (action, lib, icon, size, color) => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{ marginLeft: 15, marginRight: 15 }}>
    <TouchableOpacity onPress={action}>{IconComponent(lib, icon, size, color)}</TouchableOpacity>
  </View>
);
export const Loader = () => <ActivityIndicator />;
export const ItemSeparatorComponent = (styles) => <View style={styles} />;
export const getLabel = (name) =>
  name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
