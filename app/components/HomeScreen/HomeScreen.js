import React, { lazy, Suspense } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import WelcomeContainer from './WelcomeContainer';
import DashboardItem from './DashboardItem';
import DashboardCarousel from './DashboardCarousel';
import GuestComponent from './GuestComponent';
import getStyles from './style';
import commonStyles from '../../styles/common.style';
import withErrorBoundary from '../ErrorBoundary/WithErrorBoundary';

const RecentEvents = lazy(() => import('./RecentEvents'));
const UpcomingEvents = lazy(() => import('./UpcomingEvents'));

// Wrap your components with the withErrorBoundary HOC
const DashboardItemWithErrorBoundary = withErrorBoundary(DashboardItem);
const WelcomeContainerWithErrorBoundary = withErrorBoundary(WelcomeContainer);
const DashboardCarouselWithErrorBoundary = withErrorBoundary(DashboardCarousel);
const GuestComponentWithErrorBoundary = withErrorBoundary(GuestComponent);
const RecentEventsWithErrorBoundary = withErrorBoundary(RecentEvents);
const UpcomingEventsWithErrorBoundary = withErrorBoundary(UpcomingEvents);

const HomeScreen = () => {
  const styles = { ...getStyles(), ...commonStyles() };
  return (
    <ScrollView style={styles.container}>
      <WelcomeContainerWithErrorBoundary />
      <DashboardItemWithErrorBoundary />
      <DashboardCarouselWithErrorBoundary />
      <GuestComponentWithErrorBoundary />
      <Suspense
        fallback={
          <View style={styles.centerContent}>
            <ActivityIndicator animating />
          </View>
        }
      >
        <RecentEventsWithErrorBoundary />
      </Suspense>
      <Suspense
        fallback={
          <View style={styles.centerContent}>
            <ActivityIndicator animating />
          </View>
        }
      >
        <UpcomingEventsWithErrorBoundary />
      </Suspense>
    </ScrollView>
  );
};

export default HomeScreen;
