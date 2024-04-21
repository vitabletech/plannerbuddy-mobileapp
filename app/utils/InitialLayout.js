import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useAuth } from '../store/AuthContext';
import loadFonts from '../theme/loadFonts';
import commonStyles from '../styles/common.style';

const InitialLayout = ({ stackScreens, colorScheme }) => {
  const styles = commonStyles();
  const theme = useTheme();
  const [isReady, setIsReady] = useState(false);
  const { token, initialized } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const handleNavigation = () => {
      if (!initialized || !isReady) return;
      if (token) {
        router.replace('/drawer');
      } else {
        router.replace('/');
      }
    };

    handleNavigation();
  }, [token, initialized, isReady, router]);

  useEffect(() => {
    const prepare = async () => {
      await loadFonts();
      setIsReady(true);
    };
    prepare();
  }, []);

  if (!initialized || !isReady) return <ActivityIndicator size="large" style={styles.flex1} />;

  return (
    <>
      <StatusBar style={colorScheme} backgroundColor={theme.colors.primary} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.onPrimaryContainer,
          },
          headerTintColor: theme.colors.background,
        }}
      >
        {stackScreens.map((screen) => (
          <Stack.Screen key={screen.name} name={screen.name} options={screen.options} />
        ))}
      </Stack>
    </>
  );
};

InitialLayout.propTypes = {
  stackScreens: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      options: PropTypes.object,
    }),
  ).isRequired,
  colorScheme: PropTypes.string.isRequired,
};

export default InitialLayout;
