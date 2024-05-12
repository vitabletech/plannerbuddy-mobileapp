import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { avatar } from './utils';
import getStyles from './style';

const WelcomeContainer = () => {
  const styles = getStyles();
  const name = useSelector((state) => state.auth.userProfile).fullName;
  return (
    <View style={styles.welcomeContainer}>
      <Card.Title
        title={`Welcome, ${name}`}
        titleStyle={styles.titleStyle}
        right={() => avatar()}
        rightStyle={styles.rightStyle}
      />
    </View>
  );
};

export default WelcomeContainer;
