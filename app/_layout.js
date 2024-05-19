import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { themes } from './theme/themes';
import InitialLayout from './utils/InitialLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import store from './store/store';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? themes.dark : themes.light;

  const stackScreens = [
    {
      name: 'index',
      options: { headerShown: false },
    },
    {
      name: 'Screens',
      options: { headerShown: false },
    },
    {
      name: 'register',
      options: { headerShown: false },
    },
    {
      name: 'help',
      options: {
        presentation: 'modal',
        title: 'Chat Support',
        headerStyle: { backgroundColor: theme.colors.onPrimaryContainer },
        headerTintColor: theme.colors.onSurface,
        headerShown: Platform.OS !== 'ios',
      },
    },
    {
      name: 'privacy',
      options: {
        presentation: 'modal',
        title: 'Privacy',
        headerStyle: { backgroundColor: theme.colors.onPrimaryContainer },
        headerTintColor: theme.colors.onSurface,
        headerShown: Platform.OS !== 'ios',
      },
    },
    {
      name: 'forget',
      options: {
        presentation: 'modal',
        title: 'Forget Password',
        headerStyle: { backgroundColor: theme.colors.onPrimaryContainer },
        headerTintColor: theme.colors.onSurface,
        headerShown: Platform.OS !== 'ios',
      },
    },
    {
      name: 'eventDetails',
      options: {
        title: 'Event Details',
        headerStyle: { backgroundColor: theme.colors.onPrimaryContainer },
        headerTintColor: theme.colors.white,
        headerBackTitle: 'Back',
      },
    },
    {
      name: 'GiftScreen/Gifts',
      options: {
        title: 'Gifts',
        headerTintColor: theme.colors.white,
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
    {
      name: 'InviteScreen/InviteHome',
      options: {
        title: 'Invitations',
        headerTintColor: theme.colors.white,
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
    {
      name: 'CreativeScreen/CreativeScreen',
      options: {
        title: 'Creative Zone',
        headerTintColor: theme.colors.white,
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
  ];

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <PaperProvider theme={theme}>
          <InitialLayout stackScreens={stackScreens} colorScheme={colorScheme} />
        </PaperProvider>
      </ErrorBoundary>
    </Provider>
  );
};
export default RootLayout;
