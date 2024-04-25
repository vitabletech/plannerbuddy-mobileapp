import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { useTheme } from 'react-native-paper';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

const TabLayout = () => {
  const theme = useTheme();
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: 'capitalize',
          fontWeight: 'bold',
          width: '100',
        },
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
      }}
    >
      <MaterialTopTabs.Screen name="index" options={{ title: 'Add Guests' }} />
      <MaterialTopTabs.Screen name="SyncContact" options={{ title: 'Sync Guest' }} />
    </MaterialTopTabs>
  );
};

export default TabLayout;
