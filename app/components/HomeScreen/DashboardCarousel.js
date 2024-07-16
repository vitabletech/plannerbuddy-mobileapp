import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { dashboardCards } from './utils';
import commonStyles from '../../styles/common.style';

const DashboardCarousel = () => {
  const styles = commonStyles();
  const sliderWidth = Dimensions.get('window').width + 10;
  const height = Dimensions.get('window').width * 0.5;

  const renderItem = ({ item }) => {
    return (
      <Card style={styles.carouselCard}>
        <Card.Content>
          <View style={styles.flexRow}>
            <View style={styles.flex1}>
              <Text variant="titleLarge">{item.title}</Text>
              <Text variant="bodyMedium" style={styles.bodyText}>
                {item.text}
              </Text>
              <TouchableOpacity
                onPress={() => router.push('./../CreativeScreen/CreativeScreen')}
                contentStyle={styles.createButtonContent}
                style={styles.createButton}
              >
                <View style={styles.borderLine}>
                  <Text variant="titleLarge" style={styles.textColor}>
                    Create now{' '}
                    <FontAwesome name="angle-double-right" size={24} style={styles.textColor} />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.flex1, styles.flexEnd]}>
              <Image source={item.image} style={styles.image} />
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
