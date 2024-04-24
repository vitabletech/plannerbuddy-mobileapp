import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { avatar } from './utils';
import getStyles from './style';

const WelcomeContainer = () => {
  const styles = getStyles();
  return (
    <View style={styles.welcomeContainer}>
      <Card.Title
        title="Welcome Mayank"
        titleStyle={styles.titleStyle}
        right={() => avatar()}
        rightStyle={styles.rightStyle}
      />
    </View>
  );
};

export default WelcomeContainer;
