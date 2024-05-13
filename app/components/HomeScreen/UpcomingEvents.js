import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { UpcomingEventsCards } from './utils';
import getStyles from './style';
import RenderEventCards from './RenderEventCards';

const UpcomingEvents = () => {
  const classes = getStyles();
  const theme = useTheme();
  const router = useRouter();
  const sliderWidth = Dimensions.get('window').width;
  const height = Dimensions.get('window').width * 0.5;
  const renderItem = ({ item = {} } = {}) => <RenderEventCards item={item} />;
  return (
    <>
      <View style={classes.recentEventsContainer}>
        <Text style={classes.recentEventsHeadingText}>Upcoming Events</Text>
        <TouchableOpacity onPress={() => router.replace('./../Screens/Events')}>
          <Text style={{ color: theme.colors.primary }} variant="titleSmall">
            {UpcomingEventsCards.length ? 'View All' : 'Add Events'}
          </Text>
        </TouchableOpacity>
      </View>
      {UpcomingEventsCards.length ? (
        <Carousel
          width={sliderWidth}
          height={height}
          data={UpcomingEventsCards}
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

export default UpcomingEvents;
