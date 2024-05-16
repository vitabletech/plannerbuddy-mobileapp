import React, { useEffect, useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text, AnimatedFAB, Searchbar, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AddEventModal from '../components/CreateEvents/AddEvent';
import getStyles from '../components/CreateEvents/styles';
import commonStyles from '../styles/common.style';
import EventCard from '../components/Event/EventCard';
import { eventActions, fetchEvents } from '../store/EventContext';
import { Loader, endReached } from '../utils/utils';

const Events = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const styles = { ...getStyles(), ...commonStyles() };
  const status = useSelector((state) => state.event.status);
  const allEvents = useSelector((state) => state.event.events);
  const totalPages = useSelector((state) => state.event.totalPages);
  const pages = useSelector((state) => state.event.page);
  const [page, setPage] = useState(pages);
  const [searchQuery, setSearchQuery] = useState('');
  const viewModal = useSelector((state) => state.event.showModal);
  const openDialog = () => dispatch(eventActions.openDialog());

  const handleLoadMore = useCallback(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages]);

  useEffect(() => {
    dispatch(fetchEvents({ page }));
  }, [page]);

  useEffect(() => {
    if (searchQuery === '') {
      dispatch(eventActions.resetEvents());
      dispatch(fetchEvents({ page: 1 }));
      return;
    }
    dispatch(fetchEvents({ page: 1, searchQuery }));
    dispatch(eventActions.setSearchEvents({ searchEvents: !!searchQuery }));
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        style={styles.searchBar}
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
      />
      {viewModal && <AddEventModal />}
      {/* eslint-disable-next-line no-nested-ternary */}
      {allEvents.length !== 0 ? (
        <FlatList
          data={allEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EventCard styles={styles} event={item} />}
          onEndReached={handleLoadMore}
          ListFooterComponent={() =>
            page === totalPages ? endReached(styles.title) : status === 'loading' && Loader()
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      ) : status === 'loading' ? (
        <View style={[styles.flex1, styles.centerContent]}>{Loader()}</View>
      ) : (
        <View style={[styles.flex1, styles.centerContent]}>
          <Text style={styles.centerTextLargeMarginTop}>No Event Founds</Text>
        </View>
      )}

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
          color={theme.colors.onSurface}
        />
      </View>
    </View>
  );
};

export default Events;
