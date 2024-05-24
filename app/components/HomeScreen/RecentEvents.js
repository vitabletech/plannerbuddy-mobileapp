import React, { useEffect } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import getStyles from './style';
import commonStyles from '../../styles/common.style';
import RenderEventCards from './RenderEventCards';
import { fetchRecentEvents } from '../../store/EventContext';
import { DEFAULT_HIT_SLOP } from '../../constants/constants';

const RecentEvents = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const styles = { ...getStyles(), ...commonStyles() };
  const sliderWidth = Dimensions.get('window').width;
  const height = Dimensions.get('window').width * 0.5;
  const renderItem = ({ item = {} } = {}) => <RenderEventCards item={item} />;
  const RecentEventsCards = useSelector((state) => state.event.recentEvents);
  const events = useSelector((state) => state.event.events);
  useEffect(() => {
    dispatch(fetchRecentEvents());
  }, [events]);

  return (
    <>
      <View style={styles.recentEventsContainer}>
        <Text style={styles.recentEventsHeadingText}>Recent Events</Text>
        <TouchableOpacity
          hitSlop={DEFAULT_HIT_SLOP}
          onPress={() => router.replace('./../Screens/Events')}
        >
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
