import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { RecentEventsCards } from './utils';
import getStyles from './style';
import commonStyles from '../../styles/common.style';
import RenderEventCards from './RenderEventCards';

const RecentEvents = () => {
  const router = useRouter();
  const theme = useTheme();
  const styles = { ...getStyles(), ...commonStyles() };
  const sliderWidth = Dimensions.get('window').width;
  const height = Dimensions.get('window').width * 0.5;
  const renderItem = ({ item = {} } = {}) => <RenderEventCards item={item} />;

  return (
    <>
      <View style={styles.recentEventsContainer}>
        <Text style={styles.recentEventsHeadingText}>Recent Events</Text>
        <TouchableOpacity onPress={() => router.replace('./../Screens/Events')}>
          <Text style={{ color: theme.colors.primary }} variant="titleSmall">
            {RecentEventsCards.length ? 'View All' : 'Add Events'}
          </Text>
        </TouchableOpacity>
      </View>
      {RecentEventsCards.length ? (
        <Carousel
          width={sliderWidth}
          height={height}
          data={RecentEventsCards}
          scrollAnimationDuration={1000}
          renderItem={renderItem}
          mode="parallax"
        />
      ) : (
        renderItem()
      )}
    </>
  );
};

export default RecentEvents;
