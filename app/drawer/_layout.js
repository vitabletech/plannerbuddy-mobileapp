import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../store/AuthContext';
import { IconComponent, onShare } from '../utils/utils';
import commonStyles from '../styles/common.style';
import { DEFAULT_DRAWER_ICON_SIZE } from '../constants/constants';
import { DRAWER_SCREEN } from '../utils/constant';

const CustomDrawerContent = (props) => {
  const { onLogout } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Share This App"
        icon={() => IconComponent('Entypo', 'share', DEFAULT_DRAWER_ICON_SIZE)}
        onPress={onShare}
        // eslint-disable-next-line react-native/no-inline-styles
        labelStyle={{ marginLeft: -16, fontWeight: '900' }}
      />
      <DrawerItem
        label="Logout"
        icon={() => IconComponent('Ionicons', 'log-out-outline', DEFAULT_DRAWER_ICON_SIZE)}
        onPress={() => onLogout()}
        // eslint-disable-next-line react-native/no-inline-styles
        labelStyle={{ marginLeft: -16, fontWeight: '900' }}
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
          drawerActiveBackgroundColor: theme.colors.primary,
          drawerActiveTintColor: theme.colors.onPrimary,
          drawerInactiveTintColor: theme.colors.onPrimaryContainer,
          drawerLabelStyle: { marginLeft: -20 },
          drawerStyle: {
            backgroundColor: theme.colors.onPrimary,
          },
        }}
      >
        {DRAWER_SCREEN.map((screen) => {
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
