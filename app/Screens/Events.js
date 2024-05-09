import React, { useEffect, useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text, AnimatedFAB, Searchbar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AddEventModal from '../components/CreateEvents/AddEvent';
import getStyles from '../components/CreateEvents/styles';
import commonStyles from '../styles/common.style';
import EventCard from '../components/Event/EventCard';
import { eventActions } from '../store/EventContext';
import { fetchEvents } from '../utils/apiCalls';
import { Loader } from '../utils/utils';

const Events = () => {
  const dispatch = useDispatch();
  const styles = { ...getStyles(), ...commonStyles() };
  const allEvents = useSelector((state) => state.event.events);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState(false);
  const viewModal = useSelector((state) => state.event.showModal);
  const openDialog = () => dispatch(eventActions.openDialog());

  const handleLoadMore = useCallback(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages]);

  useEffect(() => {
    setStatus(true);
    fetchEvents(page).then((response) => {
      setTotalPages(response.totalPages);
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
      setStatus(false);
    });
  }, [page]);
  return (
    <>
      <Searchbar placeholder="Search" style={styles.searchBar} />
      {viewModal && <AddEventModal />}
      <FlatList
        data={allEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventCard styles={styles} event={item} />}
        ListEmptyComponent={
          !status && <Text style={styles.centerTextLargeMarginTop}>No Events Found</Text>
        }
        onEndReached={handleLoadMore}
        ListFooterComponent={() => status && Loader()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />

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
