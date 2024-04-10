import React from 'react';
import { Link } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { iconLibraries } from './constant';

export const IconComponent = (lib, iconName, size, color) => {
  const Component = iconLibraries[lib];
  if (!Component) {
    throw new Error(`Icon library ${lib} is not supported.`);
  }
  return <Component name={iconName} size={size} color={color} />;
};

export const HeaderRight = (onLogout) => (
  <Link href="/" replace asChild>
    <TouchableOpacity onPress={onLogout}>
      {IconComponent('Ionicons', 'log-out-outline', 28, '#fff')}
    </TouchableOpacity>
  </Link>
);
export const HeaderLeft = (DrawerToggle) => (
  <TouchableOpacity onPress={DrawerToggle}>
    {IconComponent('FontAwesome5', 'bars', 28, '#fff')}
  </TouchableOpacity>
);
export const Loader = () => <ActivityIndicator />;
export const ItemSeparatorComponent = (styles) => <View style={styles} />;
