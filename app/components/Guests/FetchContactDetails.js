import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ActivityIndicator } from 'react-native-paper';
import { useContacts } from '../../hooks/useContacts';
import Contact from './ContactList';
import commonStyles from '../../styles/common.style';
import Header from './Header';
import { guestActions, fetchGuest } from '../../store/GuestContext';
import { noContactsFound, PermissionDenied, filterContacts, normalizePhoneNumber } from './utils';
import { endReached } from '../../utils/utils';
import { syncGuest } from '../../utils/apiCalls';

const FetchContactDetails = () => {
  const styles = commonStyles();
  const dispatch = useDispatch();
  const { contactList, isLoading, fetchContacts, isAccess } = useContacts();

  const [filteredContactList, setFilteredContactList] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [alreadySelectedContacts, setAlreadySelectedContacts] = useState([]);

  const guestList = useSelector((state) => state.guest.guests);
  const totalPages = useSelector((state) => state.guest.totalPages);
  const currentPage = useSelector((state) => state.guest.page);

  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    if (page < totalPages) {
      setPage(page + 1);
      dispatch(fetchGuest({ page }));
    }
  }, [page, totalPages, dispatch]);

  useEffect(() => {
    setFilteredContactList(contactList);
    setPermissionDenied(!isAccess);
  }, [contactList, isAccess]);

  useEffect(() => {
    if (contactList.length === 0 || guestList.length === 0) {
      return;
    }
    const selected = contactList
      .filter(
        (contact) =>
          contact?.phoneNumbers?.[0] &&
          guestList.some(
            (guest) => guest.phone === normalizePhoneNumber(contact.phoneNumbers[0].number),
          ),
      )
      .map((contact) => contact.id);
    setSelectedContacts(selected);
    setAlreadySelectedContacts(selected);
  }, [contactList, guestList]);

  const handleSearch = useCallback(
    (searchQuery) => {
      filterContacts(searchQuery, contactList, setFilteredContactList);
    },
    [contactList],
  );

  const renderContactItem = useCallback(
    ({ item }) => (
      <Contact
        userData={item}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
        alreadySelectedContacts={alreadySelectedContacts}
      />
    ),
    [selectedContacts, alreadySelectedContacts],
  );

  const handleSaveSelectedContacts = useCallback(() => {
    const newSelectedContacts = contactList.reduce((acc, contact) => {
      if (!alreadySelectedContacts.includes(contact.id) && selectedContacts.includes(contact.id)) {
        acc.push({
          name: contact.name,
          phoneNumber: normalizePhoneNumber(contact.phoneNumbers[0].number),
        });
      }
      return acc;
    }, []);

    if (newSelectedContacts.length) {
      syncGuest(newSelectedContacts).then((response) => {
        if (!response.error) {
          const updatedContacts = newSelectedContacts.map((contact, index) => ({
            id: response.data[index],
            ...contact,
            phone: contact.phoneNumber,
          }));
          dispatch(guestActions.addBulkGuests({ guests: updatedContacts }));
        }
        Alert.alert(response.error ? 'Error' : 'Success', response.message);
      });
    } else {
      Alert.alert('No new contacts selected', 'Please select some new contacts to Sync.');
    }
  }, [contactList, alreadySelectedContacts, selectedContacts, dispatch]);

  if (isLoading) {
    return <ActivityIndicator style={styles.flex1} />;
  }

  if (permissionDenied) {
    return PermissionDenied(fetchContacts, setPermissionDenied, styles.centerContent, styles.title);
  }

  const handleSelectAll = () => {
    let allIds = [];
    allIds = contactList.map((contact) => contact.id);
    setSelectedContacts(allIds);
  };

  return (
    <View style={styles.flex1}>
      <Header
        onSearch={handleSearch}
        isSelected={selectedContacts.length}
        totalContacts={filteredContactList.length}
        setSelectedContacts={setSelectedContacts}
        saveList={handleSaveSelectedContacts}
        showOnlySearchBar
        handleSelectAll={handleSelectAll}
      />
      <Card>
        <Card.Content style={styles.paddingBottom}>
          <FlatList
            data={filteredContactList}
            keyExtractor={(item) => item?.id?.toString()}
            ListEmptyComponent={noContactsFound(styles.title)}
            renderItem={renderContactItem}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews
            ListFooterComponent={() => endReached(styles.title)}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default FetchContactDetails;
