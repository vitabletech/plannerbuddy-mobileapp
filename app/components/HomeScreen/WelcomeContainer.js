import React from 'react';
import { View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { AvatarText } from '../../utils/utils';
import getStyles from './style';

const WelcomeContainer = () => {
  const styles = getStyles();
  const theme = useTheme();
  const name = useSelector((state) => state.auth.userProfile)?.fullName.split(' ')[0];
  return (
    <View style={styles.welcomeContainer}>
      <Card.Title
        title={`Welcome, ${name}`}
        titleStyle={styles.titleStyle}
        right={(props) =>
          AvatarText({
            ...props,
            size: 45,
            label: name[0] || '',
            labelStyle: {
              color: theme.colors.primaryContainer,
              backgroundColor: theme.colors.primary,
              borderRadius: 25,
              borderWidth: 2,
              borderColor: theme.colors.primaryContainer,
              width: 50,
              height: 50,
              fontWeight: 'bold',
            },
          })
        }
        rightStyle={styles.rightStyle}
      />
    </View>
  );
};

export default WelcomeContainer;
