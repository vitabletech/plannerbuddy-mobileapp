import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Card,
  IconButton,
  Button,
  Text,
  Menu,
  Divider,
  PaperProvider,
} from 'react-native-paper';
import { useEventContext } from '../../store/EventContext';

export default function EventCard({ styles, event }) {
  const [visible, setVisible] = useState(false);
  const icon = event.name.toLowerCase().includes('birth') ? 'cake' : 'party-popper';
  const { setMode, openDialog, setEditIndex, deleteEvent } = useEventContext();

  const handleEditEvent = () => {
    setMode('edit');
    setEditIndex(event.id);
    openDialog();
  };

  return (
    <Card style={styles.eventCard}>
      <Card.Title
        title={event.name}
        titleNumberOfLines={2}
        titleStyle={styles.eventTitle}
        subtitle={event.date}
        left={(props) => <Avatar.Icon {...props} icon={icon} />}
        right={(props) => (
          <IconButton
            {...props}
            icon="dots-vertical"
            onPress={() => setVisible((state) => !state)}
          />
        )}
      />
      <View style={styles.locationContainer}>
        <Avatar.Icon style={styles.locationImage} size={18} icon="map-marker" />
        <Text style={styles.locationText}>{event.address}</Text>
      </View>
      {visible && (
        <Card.Actions style={styles.actionsContainer}>
          <Button onPress={() => deleteEvent(event.id)}>Delete</Button>
          <Button onPress={handleEditEvent}>Edit</Button>
        </Card.Actions>
      )}
    </Card>
  );
}
