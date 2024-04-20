import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { IconComponent } from '../utils/utils';
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

const CustomDrawerContent = (props) => {
  const { onLogout } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={() => IconComponent('Ionicons', 'log-out-outline', 28, 'black')}
        onPress={() => onLogout()}
        // eslint-disable-next-line react-native/no-inline-styles
        labelStyle={{ marginLeft: -16, fontWeight: '900', color: 'white' }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerLayout = () => {
  const classes = commonStyles();
  const theme = useTheme();
  return (
    <GestureHandlerRootView style={classes.flex1}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.background,
          drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor: theme.colors.background,
          drawerActiveTintColor: theme.colors.onPrimary,
          drawerInactiveTintColor: theme.colors.onPrimaryContainer,
          drawerLabelStyle: { marginLeft: -20 },
          drawerStyle: {
            backgroundColor: theme.colors.primaryContainer,
          },
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
