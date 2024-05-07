import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, AnimatedFAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AddEventModal from '../components/CreateEvents/AddEvent';
import getStyles from '../components/CreateEvents/styles';
import commonStyles from '../styles/common.style';
import EventCard from '../components/Event/Event';
import { eventActions } from '../store/EventContext';
import customAxios from '../utils/customAxios';

const Events = () => {
  const dispatch = useDispatch();
  const styles = { ...getStyles(), ...commonStyles() };
  const allEvents = useSelector((state) => state.event.events);
  const viewModal = useSelector((state) => state.event.showModal);
  const openDialog = () => dispatch(eventActions.openDialog());

  useEffect(() => {
    customAxios
      .get('event')
      .then((response) => {
        console.log('response.data :: ', response);
        // eslint-disable-next-line max-len
      })
      .catch((err) => {
        console.log('err :: ', err);
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
