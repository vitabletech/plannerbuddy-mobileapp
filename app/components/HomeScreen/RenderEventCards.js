import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Card, Text, Avatar } from 'react-native-paper';
import getStyles from './style';
import commonStyles from '../../styles/common.style';
import { formatDate } from '../../utils/utils';

const RenderEventCards = ({ item }) => {
  const styles = { ...getStyles(), ...commonStyles() };
  if (!Object.keys(item).length) {
    return (
      <Card style={styles.cardDefaultHeight}>
        <Card.Content>
          <Text style={styles.title}>No Events Founds</Text>
        </Card.Content>
      </Card>
    );
  }
  return (
    <Card>
      <Card.Title title={item.title} titleStyle={styles.event_title} />
      <Card.Content>
        <View style={styles.flexRow}>
          <View style={styles.flex1}>
            <View style={[styles.flexRow, styles.alignItems_center, styles.mb10]}>
              <Avatar.Icon size={24} icon="calendar" style={styles.mr10} />
              <Text variant="bodyMedium">{formatDate(item.date)}</Text>
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

RenderEventCards.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    address: PropTypes.string,
    invited_guest: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

export default RenderEventCards;
