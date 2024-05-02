import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './store/AuthContext';
import { themes } from './theme/themes';
import InitialLayout from './utils/InitialLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { EventProvider } from './store/EventContext';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? themes.dark : themes.light;

  const stackScreens = [
    {
      name: 'index',
      options: { headerShown: false },
    },
    {
      name: 'drawer',
      options: { headerShown: false },
    },
    {
      name: 'register',
      options: { headerShown: false },
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
        <PaperProvider theme={theme}>
          <AuthProvider>
            <InitialLayout stackScreens={stackScreens} colorScheme={colorScheme} />
          </AuthProvider>
        </PaperProvider>
      </EventProvider>
    </ErrorBoundary>
  );
};
export default RootLayout;
