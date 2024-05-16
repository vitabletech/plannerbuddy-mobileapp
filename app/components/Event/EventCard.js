/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { Avatar, Card, Button, Text, IconButton, useTheme } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ScrollView } from 'react-native-virtualized-view';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import GuestLists from '../GuestLists/GuestLists';
import { AvatarIcon } from '../../utils/utils';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { eventActions } from '../../store/EventContext';
import { deleteEvent } from '../../utils/apiCalls';

const EventCard = React.memo(({ styles, event }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const refStandard = useRef();
  const icon = event.name.toLowerCase().includes('birth') ? 'cake' : 'party-popper';
  const openDialog = () => dispatch(eventActions.openDialog());
  const [visible, setVisible] = useState(false);
  const handleEditEvent = () => {
    dispatch(eventActions.setMode({ mode: 'edit' }));
    dispatch(eventActions.setEditIndex({ idx: event.id }));
    openDialog();
  };
  const handleOpenSelectGuests = () => {
    dispatch(eventActions.setMode({ mode: 'editGuests' }));
    dispatch(eventActions.setEditIndex({ idx: event.id }));
    refStandard.current.open();
  };

  const handleCloseSelectGuests = () => {
    dispatch(eventActions.setEditIndex({ idx: event.id }));
    refStandard.current.close();
  };

  const handleEventDetails = () => {
    router.push(`eventDetails?eventId=${event.id}`);
  };

  const confirmDelete = () => {
    setVisible(true);
  };

  const handleRemoveEvent = () => {
    deleteEvent(event.id).then((response) => {
      if (!response.error) {
        dispatch(eventActions.deleteEvent({ id: event.id }));
        setVisible(false);
      }
      Alert.alert(response.error ? 'Fail' : 'Success', response.message);
    });
  };

  const buttonComponent = ({ isYourEvent }) => {
    return (
      <View style={styles.allButtons}>
        {isYourEvent === 'yes' && (
          <IconButton icon="account-multiple-plus-outline" onPress={handleOpenSelectGuests} />
        )}
        <IconButton icon="pencil-outline" onPress={handleEditEvent} />
        <IconButton icon="delete-outline" onPress={confirmDelete} />
      </View>
    );
  };

  return (
    <>
      {visible && (
        <ConfirmDialog visible={visible} onDelete={handleRemoveEvent} setVisible={setVisible} />
      )}
      <RBSheet
        ref={refStandard}
        height={700}
        customStyles={{
          container: {
            backgroundColor: theme.colors.primaryContainer,
          },
        }}
      >
        <View style={styles.closeButton}>
          <Button onPress={handleCloseSelectGuests}>Close</Button>
        </View>

        <ScrollView>
          <GuestLists selectMode />
        </ScrollView>
      </RBSheet>

      <Card style={styles.eventCard} onPress={handleEventDetails}>
        <Card.Title
          title={`${event.name} - ${event.id}`}
          titleNumberOfLines={2}
          titleStyle={styles.eventTitle}
          subtitle={event.date}
          left={(props) => AvatarIcon(icon, props)}
          right={(props) => buttonComponent({ isYourEvent: event.isYourEvent, ...props })}
        />
        <View style={styles.locationContainer}>
          <Avatar.Icon style={styles.locationImage} size={18} icon="map-marker" />
          <Text style={styles.locationText}>{event.address}</Text>
        </View>
      </Card>
    </>
  );
});

EventCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  event: PropTypes.object.isRequired,
};

export default EventCard;
