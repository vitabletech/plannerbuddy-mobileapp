import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, AnimatedFAB } from 'react-native-paper';
import AddEventModal from '../components/CreateEvents/AddEvent';
import getStyles from '../components/CreateEvents/styles';
import commonStyles from '../styles/common.style';
import EventCard from '../components/Event/Event';
import { useSelector, useDispatch } from 'react-redux';
import { eventActions } from '../store/EventContext';
// import { useEventContext } from '../store/EventContext';

const Events = () => {
  const dispatch = useDispatch();
  const styles = { ...getStyles(), ...commonStyles() };
  // const { events, showModal, openDialog } = useEventContext();
  const allEvents = useSelector((state) => state.event.events);
  const viewModal = useSelector((state) => state.event.showModal);
  const openDialog = () => dispatch(eventActions.openDialog());

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
