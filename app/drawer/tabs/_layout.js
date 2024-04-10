import React from 'react';
import { Tabs, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { IconComponent, HeaderRight, HeaderLeft } from '../../utils/utils';

const TabLayout = () => {
  const { onLogout } = useAuth();
  const navigation = useNavigation();
  const DrawerToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  // Define the tab screens data
  const tabScreens = [
    {
      name: 'index',
      title: 'Home',
      icon: ({ size, color }) => IconComponent('FontAwesome', 'home', size, color),
      headerShown: false,
    },
    {
      name: 'action',
      title: 'Menu',
      icon: ({ size, color }) => IconComponent('FontAwesome', 'bars', size, color),
      onPress: () => DrawerToggle(),
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#171630',
        },
        headerTintColor: '#fff',
        headerLeft: () => HeaderLeft(DrawerToggle),
        headerRight: () => HeaderRight(onLogout),
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
