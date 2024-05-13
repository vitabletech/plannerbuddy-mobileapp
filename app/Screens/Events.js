import React, { useEffect, useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text, AnimatedFAB, Searchbar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AddEventModal from '../components/CreateEvents/AddEvent';
import getStyles from '../components/CreateEvents/styles';
import commonStyles from '../styles/common.style';
import EventCard from '../components/Event/EventCard';
import { eventActions, fetchEvents } from '../store/EventContext';
import { Loader, endReached } from '../utils/utils';

const Events = () => {
  const dispatch = useDispatch();
  const styles = { ...getStyles(), ...commonStyles() };
  const status = useSelector((state) => state.event.status);
  const allEvents = useSelector((state) => state.event.events);
  const totalPages = useSelector((state) => state.event.totalPages);
  const pages = useSelector((state) => state.event.page);
  const [page, setPage] = useState(pages);
  const viewModal = useSelector((state) => state.event.showModal);
  const openDialog = () => dispatch(eventActions.openDialog());

  const handleLoadMore = useCallback(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages]);
  useEffect(() => {
    dispatch(fetchEvents(page));
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
        ListFooterComponent={() =>
          page === totalPages ? endReached(styles.title) : status === 'loading' && Loader()
        }
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
