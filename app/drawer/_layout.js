import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';
import { IconComponent, HeaderRight } from '../utils/utils';
import commonStyles from '../styles/common.style';

const screens = [
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
    icon: { lib: 'Ionicons', name: 'person-outline' },
  },
  {
    name: 'ViewGuests',
    drawerLabel: 'Guest Lists',
    headerTitle: 'Guest Lists',
    icon: { lib: 'Ionicons', name: 'person-outline' },
  },
];

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const DrawerLayout = () => {
  const classes = commonStyles();
  const { onLogout } = useAuth();
  return (
    <GestureHandlerRootView style={classes.flex1}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#171630',
          },
          headerTintColor: '#fff',
          drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor: '#171630',
          drawerActiveTintColor: '#fff',
          drawerLabelStyle: { marginLeft: -20 },
          headerRight: () => HeaderRight(onLogout),
        }}
      >
        {screens.map((screen) => {
          return (
            <Drawer.Screen
              key={screen.name}
              name={screen.name}
              initialParams={screen.uri ? { uri: screen.uri } : null}
              options={{
                drawerLabel: screen.drawerLabel,
                headerTitle: screen.headerTitle,
                headerShown: screen.headerShown,
                drawerIcon: ({ size, color }) =>
                  IconComponent(screen.icon.lib, screen.icon.name, size, color),
              }}
            />
          );
        })}
      </Drawer>
    </GestureHandlerRootView>
  );
};
export default DrawerLayout;
