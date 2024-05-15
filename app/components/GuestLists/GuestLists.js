/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import UserDataList from './UserDataList';
import { Loader, ItemSeparatorComponent, endReached, AlertComponent } from '../../utils/utils';
import commonStyles from '../../styles/common.style';
import getStyles from './style';
import Header from '../Guests/Header';
import { filterContacts } from '../Guests/utils';
import { eventActions } from '../../store/EventContext';
import { fetchGuest, guestActions } from '../../store/GuestContext';

const GuestLists = ({ selectMode }) => {
  const styles = { ...getStyles(), ...commonStyles() };
  const [searchGuest, setSearchGuest] = useState('');
  const error = useSelector((state) => state.guest.error);
  const users = useSelector((state) => state.guest.guests);
  const status = useSelector((state) => state.guest.status);
  const totalPages = useSelector((state) => state.guest.totalPages);
  const pages = useSelector((state) => state.guest.page);
  const [page, setPage] = useState(pages);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const editIndex = useSelector((state) => state.event.editIndex);

  const [contactList, setContactList] = useState([]);
  const [filteredContactList, setFilteredContactList] = useState(contactList);
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    setContactList(users);
  }, [users]);

  const handleSearch = (searchQuery) => {
    filterContacts(searchQuery, contactList, setFilteredContactList);
  };

  useEffect(() => {
    if (selectMode) {
      const currentEvent = events.find((event) => event.id === editIndex);
      setSelectedContacts(currentEvent?.guests.map((guest) => guest.id));
    }
  }, [selectMode]);

  const handleSaveSelectedContacts = () => {
    const selectedContactsObjects = [];
    selectedContacts.forEach((contactId) => {
      selectedContactsObjects.push(
        contactList.find((contact) => {
          if (contact.id === contactId) {
            return {
              id: contact.id,
              firstName: contact.firstName,
              lastName: contact.lastName,
              phone: contact.phone,
            };
          }
          return false;
        }),
      );
    });
    console.log('selectedContactsObjects', selectedContactsObjects);
    dispatch(eventActions.addGuestsToEvent({ guests: selectedContactsObjects }));
    alert('Guests added successfully');
  };

  useEffect(() => {
    setFilteredContactList(contactList);
  }, [contactList]);

  useEffect(() => {
    console.log('searchGuest :: ', searchGuest);
    dispatch(fetchGuest({ page, searchGuest }));
  }, [page]);

  useEffect(() => {
    if (searchGuest === '') {
      dispatch(guestActions.resetSearch());
      dispatch(fetchGuest({ page: 1 }));
      return;
    }
    if (searchGuest.length < 3) {
      return;
    }
    const timeoutId = setTimeout(() => {
      dispatch(fetchGuest({ page: 1, searchGuest }));
      dispatch(guestActions.setSearchGuest({ searchGuests: !!searchGuest }));
    }, 3000); // Delay of 5 seconds
    // Cleanup function to clear the timeout if the component unmounts
    clearTimeout(timeoutId);
  }, [searchGuest, dispatch]);

  const handleLoadMore = useCallback(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages]);

  const renderItem = ({ item }) => (
    <UserDataList
      userData={item}
      selectedContacts={selectedContacts}
      setSelectedContacts={setSelectedContacts}
      selectMode={selectMode}
    />
  );

  return (
    <View style={styles.flex1}>
      {AlertComponent(error)}
      {selectMode && selectedContacts && (
        <Header
          onSearch={handleSearch}
          isSelected={selectedContacts.length}
          setSelectedContacts={setSelectedContacts}
          saveList={handleSaveSelectedContacts}
        />
      )}
      <Searchbar
        placeholder="Search Type atleast 3 characters"
        style={styles.searchBar}
        onChangeText={(query) => setSearchGuest(query)}
        value={searchGuest}
      />
      {users.length !== 0 ? (
        <FlatList
          data={filteredContactList}
          keyExtractor={(usersData) => `${usersData?.item?.id?.toString()}-${Math.random()}`}
          renderItem={(item) => renderItem(item)}
          ItemSeparatorComponent={() => ItemSeparatorComponent(styles.itemSeparator)}
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
          <Text style={styles.centerTextLargeMarginTop}>No Guests</Text>
        </View>
      )}
    </View>
  );
};

GuestLists.propTypes = {
  selectMode: PropTypes.bool.isRequired,
};
export default GuestLists;
