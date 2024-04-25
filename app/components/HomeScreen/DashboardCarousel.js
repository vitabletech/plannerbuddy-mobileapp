import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Image, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { dashboardCards } from './utils';
import commonStyles from '../../styles/common.style';

const DashboardCarousel = () => {
  const styles = commonStyles();
  const sliderWidth = Dimensions.get('window').width + 10;
  const height = Dimensions.get('window').width * 0.5;
  const renderItem = ({ item }) => {
    return (
      <Card>
        <Card.Content>
          <View style={styles.flexRow}>
            <View style={styles.flex1}>
              <Text variant="titleLarge">{item.title}</Text>
              <Text variant="bodyMedium">{item.text}</Text>
            </View>
            <View style={[styles.flex1, styles.flexEnd]}>
              <Image source={item.image} />
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };
  return (
    <Carousel
      loop
      autoPlay
      width={sliderWidth}
      height={height}
      data={dashboardCards}
      scrollAnimationDuration={1000}
      renderItem={renderItem}
      mode="parallax"
      style={styles.templateContainer}
    />
  );
};

export default DashboardCarousel;
