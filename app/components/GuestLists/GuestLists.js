/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import UserDataList from './UserDataList';
import { Loader, ItemSeparatorComponent, endReached } from '../../utils/utils';
import commonStyles from '../../styles/common.style';
import getStyles from './style';
import Header from '../Guests/Header';
import { filterContacts } from '../Guests/utils';
import { eventActions } from '../../store/EventContext';
import { fetchGuest } from '../../store/GuestContext';

const GuestLists = ({ selectMode }) => {
  const styles = { ...getStyles(), ...commonStyles() };
  const users = useSelector((state) => state.guest.guests);
  const status = useSelector((state) => state.guest.status);
  const totalPages = useSelector((state) => state.guest.totalPages);
  console.log('totalPages :: ', totalPages);
  const [page, setPage] = useState(18);
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
    dispatch(eventActions.addGuestsToEvent({ guests: selectedContactsObjects }));
    alert('Guests added successfully');
  };

  useEffect(() => {
    setFilteredContactList(contactList);
  }, [contactList]);

  useEffect(() => {
    dispatch(fetchGuest(page));
  }, [page]);

  const handleLoadMore = useCallback(() => {
    console.log('page :: ', page);
    console.log('totalPages :: ', totalPages);
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

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
      {selectMode && selectedContacts && (
        <Header
          onSearch={handleSearch}
          isSelected={selectedContacts.length}
          setSelectedContacts={setSelectedContacts}
          saveList={handleSaveSelectedContacts}
        />
      )}
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
