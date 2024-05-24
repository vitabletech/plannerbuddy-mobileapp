import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import getStyles from './style';
import RenderEventCards from './RenderEventCards';
import { fetchInvitation } from '../../store/EventContext';
import { DEFAULT_HIT_SLOP } from '../../constants/constants';

const UpcomingEvents = () => {
  const classes = getStyles();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const sliderWidth = Dimensions.get('window').width;
  const height = Dimensions.get('window').width * 0.5;
  const renderItem = ({ item = {} } = {}) => <RenderEventCards item={item} />;
  const UpcomingEventsCards = useSelector((state) => state.event.invitationEvents);
  const events = useSelector((state) => state.event.events);
  useEffect(() => {
    dispatch(fetchInvitation());
  }, [events]);
  return (
    <>
      <View style={classes.recentEventsContainer}>
        <Text style={classes.recentEventsHeadingText}>Invitation Events</Text>
        <TouchableOpacity
          hitSlop={DEFAULT_HIT_SLOP}
          onPress={() => router.push('./../InviteScreen/InviteHome')}
        >
          <Text style={{ color: theme.colors.primary }} variant="titleSmall">
            View All
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
