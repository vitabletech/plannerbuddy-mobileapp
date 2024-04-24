import React from 'react';
import { View, ScrollView } from 'react-native';
import WelcomeContainer from './WelcomeContainer';
import DashboardCarousel from './DashboardCarousel';
import DashboardItem from './DashboardItem';
import GuestComponent from './GuestComponent';
import RecentEvents from './RecentEvents';
import getStyles from './style';

const HomeScreen = () => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <WelcomeContainer />
      <ScrollView>
        <DashboardItem />
        <DashboardCarousel />
        <GuestComponent />
        <RecentEvents />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
