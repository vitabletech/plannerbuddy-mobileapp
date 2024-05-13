import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card, Divider, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarIcon } from '../../utils/utils';
import getStyles from './styles';
import { giftsActions } from '../../store/reducers/giftSlice';

const GiftCard = ({ giftId, eventId, guestId, amount, desc }) => {
  const styles = getStyles();
  const dispatch = useDispatch();
  const guests = useSelector((state) => state.guest.guests);
  const events = useSelector((state) => state.event.events);
  const currentGuest = guests.find((g) => g.id === guestId);
  const currentEvent = events.find((e) => e.id === eventId);

  const handleDeleteGift = () => {
    dispatch(giftsActions.removeGift({ id: giftId }));
  };
  const rightButton = () => (
    <IconButton size={30} icon="delete-outline" onPress={handleDeleteGift} />
  );

  return (
    <Card style={styles.header}>
      {/* <ImageBackground source={giftIcon}> */}
      <Card.Title
        title={`Amount : ${amount}`}
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
              {currentGuest.name}
            </Text>
          </View>
          <View style={styles.info}>
            <IconButton icon="calendar-blank-outline" />
            <Text variant="titleMedium" style={styles.text}>
              {currentEvent.name}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={styles.notes}>
          <IconButton icon="text" />
          <Text variant="titleMedium" style={styles.text}>
            {desc}
          </Text>
        </View>
      </Card.Content>
      {/* </ImageBackground> */}
    </Card>
  );
};

GiftCard.propTypes = {
  giftId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  guestId: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
};

export default GiftCard;
