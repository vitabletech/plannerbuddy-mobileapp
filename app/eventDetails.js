import React, { useState } from 'react';
import { Avatar, Card, IconButton, Text, List, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-virtualized-view';
import { useDispatch, useSelector } from 'react-redux';
import getStyles from './components/CreateEvents/styles';
import commonStyles from './styles/common.style';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog';
import { eventActions } from './store/EventContext';
import { deleteEvent } from './utils/apiCalls';

const eventDetails = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = { ...getStyles(), ...commonStyles() };
  const { eventId } = useLocalSearchParams();
  const events = useSelector((state) => state.event.events);
  const event = events.find((e) => e.id === +eventId);
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded((state) => !state);
  const icon = event?.name.toLowerCase().includes('birth') ? 'cake' : 'party-popper';
  const [visible, setVisible] = useState(false);

  const confirmDelete = () => {
    setVisible(true);
  };
  const handleRemoveEvent = () => {
    deleteEvent(event.id).then((response) => {
      if (!response.error) {
        dispatch(eventActions.deleteEvent({ id: event.id }));
        setVisible(false);
        router.back();
      }
    });
  };
  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.white,
          tabBarActiveTintColor: theme.colors.white,
          tabBarInactiveTintColor: theme.colors.shadow,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
      {visible && (
        <ConfirmDialog visible={visible} onDelete={handleRemoveEvent} setVisible={setVisible} />
      )}
      {event === undefined ? (
        <Card>
          <Card.Title
            title="No Event Found"
            titleNumberOfLines={2}
            titleStyle={styles.eventTitle}
          />
        </Card>
      ) : (
        <Card>
          <Card.Title
            title={event?.name}
            titleNumberOfLines={2}
            titleStyle={styles.eventTitle}
            subtitle={event.date}
            left={(props) => <Avatar.Icon {...props} icon={icon} />}
            right={(props) => (
              <IconButton {...props} icon="delete-outline" onPress={confirmDelete} />
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
                      title={`${guest.name}`}
                      description={guest.phone}
                      left={(props) => (
                        <Avatar.Text
                          size={45}
                          labelStyle={styles.textWhite}
                          {...props}
                          label={guest?.name?.[0]}
                        />
                      )}
                    />
                  ))
                )}
              </ScrollView>
            </List.Accordion>
          </List.Section>
        </Card>
      )}
    </View>
  );
};

export default eventDetails;
