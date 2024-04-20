import React from 'react';
import { Tabs, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { IconComponent, HeaderLeft, HeaderRight } from '../../utils/utils';
import { DEFAULT_BOTTOM_TAB_ICON_SIZE } from '../../constants/constants';

const TabLayout = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const DrawerToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  // Define the tab screens data
  const tabScreens = [
    {
      name: 'index',
      title: 'Home',
      icon: ({ color }) =>
        IconComponent('FontAwesome', 'home', DEFAULT_BOTTOM_TAB_ICON_SIZE, color),
      headerShown: false,
    },
    {
      name: 'Events',
      title: 'Events',
      icon: ({ color }) =>
        IconComponent('MaterialIcons', 'event', DEFAULT_BOTTOM_TAB_ICON_SIZE, color),
    },
    {
      name: 'Guests',
      title: 'Guests',
      icon: ({ color }) => IconComponent('Zocial', 'guest', DEFAULT_BOTTOM_TAB_ICON_SIZE, color),
    },
    {
      name: 'CreativeZone',
      title: 'Creative Zone',
      icon: ({ color }) => IconComponent('AntDesign', 'gift', DEFAULT_BOTTOM_TAB_ICON_SIZE, color),
    },
    {
      name: 'action',
      title: 'Menu',
      icon: () => IconComponent('FontAwesome', 'bars', DEFAULT_BOTTOM_TAB_ICON_SIZE),
      onPress: () => DrawerToggle(),
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onPrimaryContainer,
        headerLeft: () =>
          HeaderLeft(DrawerToggle, 'FontAwesome5', 'bars', 20, theme.colors.onPrimaryContainer),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.shadow,
        tabBarLabelStyle: {
          fontFamily: 'Gilroy-Regular',
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      {tabScreens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: screen.icon,
            tabBarBadge: screen.badge,
            headerShown: screen.headerShown,
          }}
          listeners={
            screen.onPress
              ? () => ({
                  tabPress: (e) => {
                    e.preventDefault();
                    screen.onPress();
                  },
                })
              : undefined
          }
        />
      ))}
    </Tabs>
  );
};
export default TabLayout;
