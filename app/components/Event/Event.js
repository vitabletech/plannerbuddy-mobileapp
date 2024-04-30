import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Avatar, Card, Button, Text } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ScrollView } from 'react-native-virtualized-view';
import { router } from 'expo-router';
import { useEventContext } from '../../store/EventContext';
import GuestLists from '../GuestLists/GuestLists';
import { AvatarIcon, renderIconButton } from '../../utils/utils';

const EventCard = ({ styles, event }) => {
  const refStandard = useRef();
  const [visible, setVisible] = useState(false);
  const icon = event.name.toLowerCase().includes('birth') ? 'cake' : 'party-popper';
  const { setMode, openDialog, setEditIndex, deleteEvent } = useEventContext();
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
    router.push(`eventDetails?id=${event.id}`);
  };

  return (
    <>
      <RBSheet ref={refStandard} height={700}>
        <View style={[styles.flexRow, styles.flexEnd]}>
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
          right={(props) =>
            renderIconButton({
              icon: 'dots-vertical',
              ...props,
              onPress: () => setVisible((state) => !state),
            })
          }
        />
        <View style={styles.locationContainer}>
          <Avatar.Icon style={styles.locationImage} size={18} icon="map-marker" />
          <Text style={styles.locationText}>{event.address}</Text>
        </View>
        {visible && (
          <Card.Actions style={styles.actionsContainer}>
            <Button style={styles} onPress={handleOpenSelectGuests}>
              Add Guests
            </Button>
            <Button onPress={() => deleteEvent(event.id)}>Delete</Button>
            <Button onPress={handleEditEvent}>Edit</Button>
          </Card.Actions>
        )}
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
