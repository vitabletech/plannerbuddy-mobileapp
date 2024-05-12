import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Card, Divider, IconButton, Text } from 'react-native-paper';
import giftIcon from '../../assets/images/gift1.png';
import { AvatarIcon } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import getStyles from './styles';
import { giftsActions } from '../../store/GiftContext';

const GiftCard = ({ giftId, eventId, guestId, amount, desc }) => {
  const styles = getStyles();
  const dispatch = useDispatch();
  console.log('guestId :: ', guestId);
  const guests = useSelector((state) => state.guest.guests);
  console.log('guests :: ', guests);
  const events = useSelector((state) => state.event.events);
  const currentGuest = guests.find((g) => g.id === guestId);
  const currentEvent = events.find((e) => e.id === eventId);

  console.log('currentEvent :: ', currentEvent);
  console.log('currentGuest :: ', currentGuest);

  const handleDeleteGift = () => {
    console.log('giftId :: ', giftId);
    dispatch(giftsActions.removeGift({ id: giftId }));
  };
  const rightButton = () => (
    <IconButton size={30} icon="delete-outline" onPress={handleDeleteGift} />
  );

  if (!currentEvent || !currentGuest) {
    return <></>;
  }
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

export default GiftCard;
