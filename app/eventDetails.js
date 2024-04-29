import React, { useState } from 'react';
import { Avatar, Card, IconButton, Text, List } from 'react-native-paper';
import { View } from 'react-native';
import { useEventContext } from './store/EventContext';
import { useLocalSearchParams } from 'expo-router';
import getStyles from './components/CreateEvents/styles';
import { ScrollView } from 'react-native-virtualized-view';

export default function eventDetails() {
  const styles = getStyles();
  const { id } = useLocalSearchParams();
  const { events } = useEventContext();
  const event = events[id];
  console.log(events);

  const [expanded, setExpanded] = useState(false);

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
                      labelStyle={{ color: 'white' }}
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
}
