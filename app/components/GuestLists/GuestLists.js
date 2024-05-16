import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import UserDataList from './UserDataList';
import { Loader, ItemSeparatorComponent, endReached, AlertComponent } from '../../utils/utils';
import commonStyles from '../../styles/common.style';
import getStyles from './style';
import Header from '../Guests/Header';
import { eventActions } from '../../store/EventContext';
import { fetchGuest, guestActions } from '../../store/GuestContext';

const GuestLists = ({ selectMode }) => {
  const styles = { ...getStyles(), ...commonStyles() };
  const dispatch = useDispatch();
  const [searchGuest, setSearchGuest] = useState('');
  const error = useSelector((state) => state.guest.error);
  const contactList = useSelector((state) => state.guest.guests);
  const status = useSelector((state) => state.guest.status);
  const totalPages = useSelector((state) => state.guest.totalPages);
  const pages = useSelector((state) => state.guest.page);
  const events = useSelector((state) => state.event.events);
  const editIndex = useSelector((state) => state.event.editIndex);
  const [page, setPage] = useState(pages);
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    if (selectMode) {
      const currentEvent = events.find((event) => event.id === editIndex);
      setSelectedContacts(currentEvent?.guests.map((guest) => guest.id) || []);
    }
  }, [selectMode]);

  useEffect(() => {
    dispatch(fetchGuest({ page }));
  }, [page]);

  useEffect(() => {
    if (searchGuest === '') {
      dispatch(guestActions.resetSearch());
      dispatch(guestActions.setSearchGuest({ searchGuests: false }));
      setPage(1);
    } else if (searchGuest.length >= 1) {
      dispatch(fetchGuest({ page: 1, searchGuest }));
      dispatch(guestActions.setSearchGuest({ searchGuests: !!searchGuest }));
    }
  }, [searchGuest]);

  const handleLoadMore = useCallback(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages]);

  const handleSearch = (searchQuery) => {
    setSearchGuest(searchQuery);
  };

  const handleSaveSelectedContacts = () => {
    const selectedContactsObjects = contactList.filter((contact) =>
      selectedContacts.includes(contact.id),
    );
    dispatch(eventActions.addGuestsToEvent({ guests: selectedContactsObjects }));
    Alert.alert('Success', 'Guests added successfully');
  };

  const renderItem = useCallback(
    ({ item }) => (
      <UserDataList
        userData={item}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
        selectMode={selectMode}
      />
    ),
    [selectedContacts, selectMode],
  );

  return (
    <View style={styles.flex1}>
      {AlertComponent(error)}
      <Header
        onSearch={handleSearch}
        isSelected={selectedContacts.length}
        setSelectedContacts={setSelectedContacts}
        saveList={handleSaveSelectedContacts}
        showOnlySearchBar={selectMode}
      />
      {contactList.length > 0 ? (
        <FlatList
          data={contactList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => ItemSeparatorComponent(styles.itemSeparator)}
          onEndReached={searchGuest === '' && handleLoadMore}
          ListFooterComponent={() =>
            page === totalPages ? endReached(styles.title) : status === 'loading' && Loader()
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      ) : (
        <View style={[styles.flex1, styles.centerContent]}>
          {status === 'loading' ? (
            Loader()
          ) : (
            <Text style={styles.centerTextLargeMarginTop}>No Guests</Text>
          )}
        </View>
      )}
    </View>
  );
};

GuestLists.propTypes = {
  selectMode: PropTypes.bool.isRequired,
};

export default GuestLists;
