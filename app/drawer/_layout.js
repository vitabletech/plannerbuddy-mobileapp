import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { IconComponent } from '../utils/utils';
import commonStyles from '../styles/common.style';
import { DRAWER_SCREEN } from '../utils/constant';
import CustomDrawerContent from '../components/CustomDrawerContent/CustomDrawerContent';

const DrawerLayout = () => {
  const classes = commonStyles();
  const theme = useTheme();
  return (
    // <EventProvider>
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
    // </EventProvider>
  );
};
export default DrawerLayout;
