import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList } from 'react-native';
import EventCard from '../components/Event/EventCard';
import { fetchEvents } from '../store/EventContext';
import { endReached, Loader } from '../utils/utils';
import getStyles from '../components/CreateEvents/styles';
import commonStyles from '../styles/common.style';

const InviteHome = () => {
  const dispatch = useDispatch();
  const styles = { ...getStyles(), ...commonStyles() };
  const events = useSelector((state) => state.event.events);
  const totalPages = useSelector((state) => state.event.totalPages);
  const pages = useSelector((state) => state.event.page);
  const status = useSelector((state) => state.event.status);
  const [page, setPage] = useState(pages);
  const [InviteEvents, setInviteEvents] = useState([]);

  useEffect(() => {
    setInviteEvents(events.filter((event) => event?.isYourEvent === 'no'));
  }, []);

  useEffect(() => {
    dispatch(fetchEvents({ page }));
  }, [page]);

  const handleLoadMore = useCallback(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages]);

  return (
    <View style={styles.mainContainer}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {InviteEvents.length > 0 ? (
        <FlatList
          data={InviteEvents}
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
    </View>
  );
};

export default InviteHome;
