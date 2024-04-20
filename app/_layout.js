import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './store/AuthContext';
import { themes } from './theme/themes';
import InitialLayout from './utils/InitialLayout';
import { GlobalProvider } from './store/globalContext';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? themes.dark : themes.light;

  const stackScreens = [
    {
      name: 'index',
      options: { title: 'Home', headerShown: false },
    },
    {
      name: 'drawer',
      options: { headerShown: false },
    },
    {
      name: 'register',
      options: { title: 'Create Account', headerLeft: null },
    },
    {
      name: 'privacy',
      options: {
        presentation: 'modal',
        title: 'Privacy',
        headerStyle: { backgroundColor: theme.colors.onPrimaryContainer },
        headerTintColor: theme.colors.background,
        headerShown: Platform.OS !== 'ios',
        headerLeft: null,
      },
    },
  ];

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <GlobalProvider>
          <InitialLayout stackScreens={stackScreens} colorScheme={colorScheme} />
        </GlobalProvider>
      </AuthProvider>
    </PaperProvider>
  );
};
export default RootLayout;
