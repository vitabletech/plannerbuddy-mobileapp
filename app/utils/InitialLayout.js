import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { tokenVerify } from '../store/reducers/authSlice';

const InitialLayout = ({ stackScreens, colorScheme }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const userProfile = useSelector((state) => state.auth.userProfile);
  const token = userProfile?.accessToken;
  const router = useRouter();

  useEffect(() => {
    dispatch(tokenVerify());
  }, [dispatch]);

  useEffect(() => {
    router.replace(token ? '/Screens' : '/');
  }, [token, router]);

  return (
    <>
      <StatusBar style={colorScheme} backgroundColor={theme.colors.primary} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'red',
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
