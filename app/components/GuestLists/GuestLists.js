import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import UserDataList from './UserDataList';
import { API_URL } from '../../constants/constants';
import { Loader, ItemSeparatorComponent } from '../../utils/utils';
import commonStyles from '../../styles/common.style';
import getStyles from './style';
import Header from '../Guests/Header';
import { filterContacts } from '../Guests/utils';
import { eventActions } from '../../store/EventContext';

const GuestLists = ({ selectMode }) => {
  const styles = { ...getStyles(), ...commonStyles() };
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const events = useSelector((state) => state.event.events);
  const editIndex = useSelector((state) => state.event.editIndex);

  const [contactList, setContactList] = useState([]);
  const [filteredContactList, setFilteredContactList] = useState(contactList);
  const [selectedContacts, setSelectedContacts] = useState([]);

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

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}users?skip=${page}&limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, ...data.users]);
        const usersData = data.users.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
        }));
        setContactList((prevContactList) => [...prevContactList, ...usersData]);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      setPage(users?.length);
    }
  }, [loading]);

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
      {users.length !== 0 && (
        <FlatList
          data={filteredContactList}
          keyExtractor={(usersData) => `${usersData?.item?.id?.toString()}-${Math.random()}`}
          renderItem={(item) => renderItem(item)}
          ItemSeparatorComponent={() => ItemSeparatorComponent(styles.itemSeparator)}
          onEndReached={handleLoadMore}
          ListFooterComponent={() => loading && Loader()}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
        />
      )}
    </View>
  );
};

GuestLists.propTypes = {
  selectMode: PropTypes.bool.isRequired,
};
export default GuestLists;
