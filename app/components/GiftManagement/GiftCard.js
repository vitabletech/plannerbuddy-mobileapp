import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { Card, Divider, IconButton, Text, Chip, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { AvatarIcon } from '../../utils/utils';
import getStyles from './styles';
import { giftsActions } from '../../store/reducers/giftSlice';
import { deleteGift } from '../../utils/apiCalls';

const GiftCard = ({ data }) => {
  const styles = getStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { giftId, amount, eventName, guestName, note, isYourGift } = data;
  const handleDeleteGift = () => {
    deleteGift(giftId).then((response) => {
      if (!response.error) {
        dispatch(giftsActions.removeGift({ giftId }));
      }
      Alert.alert(!response.error ? 'Success' : 'Fail', response.message);
    });
  };

  const rightButton = () => (
    <IconButton size={30} icon="delete-outline" onPress={handleDeleteGift} />
  );

  return (
    <Card style={styles.header}>
      <Card.Title
        title={`Amount : ${amount || 0} Rs.`}
        titleNumberOfLines={2}
        titleStyle={styles.title}
        left={(props) => AvatarIcon('gift', props)}
        right={rightButton}
      />
      <Divider />
      <Card.Content>
        <View style={styles.info}>
          <View style={styles.info}>
            <IconButton icon="account" />
            <Text variant="titleMedium" style={styles.text}>
              {guestName}
            </Text>
          </View>
          <View style={styles.info}>
            <IconButton icon="calendar-blank-outline" />
            <Text variant="titleMedium" style={styles.text}>
              {eventName}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={styles.notes}>
          <IconButton icon="text" />
          <Text variant="titleMedium" style={styles.text}>
            {note || 'No Description'}
          </Text>
        </View>
        <View style={styles.notes}>
          {isYourGift === 'yes' && (
            <Chip style={styles.isYourGift} selectedColor={theme.colors.onSecondary}>
              Received
            </Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

GiftCard.propTypes = {
  data: PropTypes.shape({
    giftId: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    eventName: PropTypes.string.isRequired,
    guestName: PropTypes.string.isRequired,
    note: PropTypes.string,
    isYourGift: PropTypes.string.isRequired,
  }).isRequired,
};

export default GiftCard;
