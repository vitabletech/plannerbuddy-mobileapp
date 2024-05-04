import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Avatar, Card, Button, Text, IconButton } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ScrollView } from 'react-native-virtualized-view';
import { router } from 'expo-router';
import { useEventContext } from '../../store/EventContext';
import GuestLists from '../GuestLists/GuestLists';
import { AvatarIcon } from '../../utils/utils';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

const EventCard = ({ styles, event }) => {
  const refStandard = useRef();
  const icon = event.name.toLowerCase().includes('birth') ? 'cake' : 'party-popper';
  const { setMode, openDialog, setEditIndex, deleteEvent } = useEventContext();
  const [visible, setVisible] = useState(false);
  const handleEditEvent = () => {
    setMode('edit');
    setEditIndex(event.id);
    openDialog();
  };

  const handleOpenSelectGuests = () => {
    setMode('getGuests');
    setEditIndex(event.id);
    refStandard.current.open();
  };

  const handleCloseSelectGuests = () => {
    setEditIndex(null);
    refStandard.current.close();
  };

  const handleEventDetails = () => {
    router.push(`eventDetails?eventId=${event.id}`);
  };

  const confirmDelete = () => {
    setVisible(true);
  };

  const handleRemoveEvent = () => {
    deleteEvent(event.id);
    setVisible(false);
  };

  const buttonComponent = () => {
    return (
      <View style={styles.allButtons}>
        <IconButton icon="account-multiple-plus-outline" onPress={handleOpenSelectGuests} />
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
      <RBSheet ref={refStandard} height={700}>
        <View style={styles.closeButton}>
          <Button onPress={handleCloseSelectGuests}>Close</Button>
        </View>

        <ScrollView>
          <GuestLists selectMode />
        </ScrollView>
      </RBSheet>

      <Card style={styles.eventCard} onPress={handleEventDetails}>
        <Card.Title
          title={event.name}
          titleNumberOfLines={2}
          titleStyle={styles.eventTitle}
          subtitle={event.date}
          left={(props) => AvatarIcon(icon, props)}
          right={buttonComponent}
        />
        <View style={styles.locationContainer}>
          <Avatar.Icon style={styles.locationImage} size={18} icon="map-marker" />
          <Text style={styles.locationText}>{event.address}</Text>
        </View>
      </Card>
    </>
  );
};

EventCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  event: PropTypes.object.isRequired,
};

export default EventCard;
