import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Dimensions } from 'react-native';
import { Card, Text, Avatar, Button } from 'react-native-paper';
import { RecentEventsCards } from './utils';
import getStyles from './style';
import commonStyles from '../../styles/common.style';

const RecentEvents = () => {
  const styles = commonStyles();
  const classes = getStyles();
  const sliderWidth = Dimensions.get('window').width;
  const height = Dimensions.get('window').width * 0.5;
  const renderItem = ({ item }) => {
    return (
      <Card>
        <Card.Title title={item.title} titleStyle={classes.event_title} />
        <Card.Content>
          <View style={styles.flexRow}>
            <View style={styles.flex1}>
              <View style={[styles.flexRow, styles.alignItems_center, styles.mb10]}>
                <Avatar.Icon size={24} icon="calendar" style={styles.mr10} />
                <Text variant="bodyMedium">{item.date}</Text>
              </View>
              <View style={[styles.flexRow, styles.alignItems_center, styles.mb10]}>
                <Avatar.Icon size={24} icon="contacts" style={styles.mr10} />
                <Text variant="bodyMedium">{item.invited_guest} Guests</Text>
              </View>
              <View style={[styles.flexRow, styles.alignItems_center]}>
                <Avatar.Icon size={24} icon="map-marker" style={styles.mr10} />
                <Text variant="bodyMedium">{item.address}</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };
  return (
    <>
      <View style={classes.recentEventsContainer}>
        <Text style={classes.recentEventsHeadingText}>Recent Events</Text>
        {/* eslint-disable-next-line react-native/no-raw-text */}
        <Button onPress={() => {}}>View All</Button>
      </View>
      <Carousel
        width={sliderWidth}
        height={height}
        data={RecentEventsCards}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
        mode="parallax"
      />
    </>
  );
};

export default RecentEvents;
