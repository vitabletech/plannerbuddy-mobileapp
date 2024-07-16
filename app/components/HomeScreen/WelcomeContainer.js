import React from 'react';
import { View, Image, useColorScheme } from 'react-native';
import { Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import getStyles from './style';
import welcomeLight from '../../assets/welcomeLight.png';
import welcomeDark from '../../assets/welcomeDark.png';

const WelcomeContainer = () => {
  const styles = getStyles();
  const colorScheme = useColorScheme();
  const name = useSelector((state) => state.auth.userProfile)?.fullName.split(' ')[0];
  return (
    <View style={styles.welcomeContainer}>
      <Image source={colorScheme === 'dark' ? welcomeDark : welcomeLight} style={styles.image} />
      <Card.Title
        title={`Welcome, ${name}`}
        titleVariant="displaySmall"
        titleStyle={styles.titleStyle}
      />
    </View>
  );
};

export default WelcomeContainer;
