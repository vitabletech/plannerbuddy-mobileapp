import React, { useState } from 'react';
import { Avatar, Card, IconButton, Text, List } from 'react-native-paper';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-virtualized-view';
import { useEventContext } from './store/EventContext';
import getStyles from './components/CreateEvents/styles';
import commonStyles from './styles/common.style';

const eventDetails = () => {
  const styles = { ...getStyles(), ...commonStyles() };
  const { id } = useLocalSearchParams();
  const { events } = useEventContext();
  const event = events[id];
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const handlePress = () => setExpanded((state) => !state);
  const icon = event.name.toLowerCase().includes('birth') ? 'cake' : 'party-popper';
  return (
    <Card>
      <Card.Title
        title={event.name}
        titleNumberOfLines={2}
        titleStyle={styles.eventTitle}
        subtitle={event.date}
        left={(props) => <Avatar.Icon {...props} icon={icon} />}
        right={(props) => (
          <IconButton {...props} icon="dots-vertical" onPress={() => setVisible(!visible)} />
        )}
      />
      <View style={styles.locationContainer}>
        <Avatar.Icon style={styles.locationImage} size={18} icon="map-marker" />
        <Text style={styles.locationText}>{event.address}</Text>
      </View>

      <List.Section>
        <List.Accordion
          title="Invited Guests"
          left={(props) => <List.Icon {...props} icon="account-group" />}
          expanded={expanded}
          onPress={handlePress}
        >
          <ScrollView>
            {event.guests.length === 0 ? (
              <List.Item title="No Guest Invited" />
            ) : (
              event.guests.map((guest) => (
                <List.Item
                  key={guest.id}
                  title={`${guest.firstName} ${guest.lastName}`}
                  description={guest.phone}
                  left={(props) => (
                    <Avatar.Text
                      size={45}
                      labelStyle={styles.textWhite}
                      {...props}
                      label={guest.firstName[0]}
                    />
                  )}
                />
              ))
            )}
          </ScrollView>
        </List.Accordion>
      </List.Section>
    </Card>
  );
};

export default eventDetails;
