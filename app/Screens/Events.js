import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, AnimatedFAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AddEventModal from '../components/CreateEvents/AddEvent';
import getStyles from '../components/CreateEvents/styles';
import commonStyles from '../styles/common.style';
import EventCard from '../components/Event/EventCard';
import { eventActions } from '../store/EventContext';
import { fetchEvents } from '../utils/apiCalls';

const Events = () => {
  const dispatch = useDispatch();
  const styles = { ...getStyles(), ...commonStyles() };
  const allEvents = useSelector((state) => state.event.events);
  const viewModal = useSelector((state) => state.event.showModal);
  const openDialog = () => dispatch(eventActions.openDialog());

  useEffect(() => {
    fetchEvents(1).then((response) => {
      const events = response.events.map((event) => {
        const { eventId, eventName, eventDate, eventLocation } = event;
        return {
          id: eventId,
          name: eventName,
          date: eventDate,
          address: eventLocation,
          guests: [],
        };
      });
      if (events.length > 0) dispatch(eventActions.addEvents(events));
    });
  }, []);
  return (
    <>
      {viewModal && <AddEventModal />}
      <ScrollView>
        {allEvents && allEvents.length > 0 ? (
          allEvents.map((event) => <EventCard key={event.id} styles={styles} event={event} />)
        ) : (
          <Text style={styles.centerTextLargeMarginTop}>No Events</Text>
        )}
      </ScrollView>

      <View style={styles.columnFlexOne}>
        <AnimatedFAB
          icon="calendar-plus"
          label="Add Event"
          extended
          onPress={openDialog}
          visible
          animateFrom="right"
          iconMode="dynamic"
          style={styles.absolutePositionBottomRight}
        />
      </View>
    </>
  );
};

export default Events;
