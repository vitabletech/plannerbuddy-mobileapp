import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import DashboardItem from './DashboardItem';
import { avatar } from './utils';
import getStyles from './style';

const HomeScreen = () => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Card.Title
          title="Welcome Mayank"
          titleStyle={styles.titleStyle}
          right={() => avatar()}
          rightStyle={styles.rightStyle}
        />
      </View>
      <DashboardItem />
    </View>
  );
};

export default HomeScreen;
