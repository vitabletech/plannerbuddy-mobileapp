import React from 'react';
import { ScrollView } from 'react-native';
import WelcomeContainer from './WelcomeContainer';
import DashboardCarousel from './DashboardCarousel';
import DashboardItem from './DashboardItem';
import GuestComponent from './GuestComponent';
import RecentEvents from './RecentEvents';
import UpcomingEvents from './UpcomingEvents';
import getStyles from './style';

const HomeScreen = () => {
  const styles = getStyles();
  return (
    <ScrollView style={styles.container}>
      <WelcomeContainer />
      <DashboardItem />
      <DashboardCarousel />
      <GuestComponent />
      <RecentEvents />
      <UpcomingEvents />
    </ScrollView>
  );
};

export default HomeScreen;
