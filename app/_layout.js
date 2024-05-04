import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './store/AuthContext';
import { themes } from './theme/themes';
import InitialLayout from './utils/InitialLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { EventProvider } from './store/EventContext';
import { GuestProvider } from './store/GuestContext';

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
        headerTintColor: theme.colors.background,
        headerShown: Platform.OS !== 'ios',
      },
    },
    {
      name: 'privacy',
      options: {
        presentation: 'modal',
        title: 'Privacy',
        headerStyle: { backgroundColor: theme.colors.onPrimaryContainer },
        headerTintColor: theme.colors.background,
        headerShown: Platform.OS !== 'ios',
      },
    },
    {
      name: 'forget',
      options: {
        presentation: 'modal',
        title: 'Forget Password',
        headerStyle: { backgroundColor: theme.colors.onPrimaryContainer },
        headerTintColor: theme.colors.background,
        headerShown: Platform.OS !== 'ios',
      },
    },
  ];

  return (
    <ErrorBoundary>
      <EventProvider>
        <GuestProvider>
          <PaperProvider theme={theme}>
            <AuthProvider>
              <InitialLayout stackScreens={stackScreens} colorScheme={colorScheme} />
            </AuthProvider>
          </PaperProvider>
        </GuestProvider>
      </EventProvider>
    </ErrorBoundary>
  );
};
export default RootLayout;
