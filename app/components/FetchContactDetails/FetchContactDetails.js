import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import * as Contacts from 'expo-contacts';
import Contact from './ContactList';
import commonStyles from '../../styles/common.style';
import Header from './Header';

const FetchContactDetails = () => {
  const styles = commonStyles();
  const [contactList, setContactList] = useState([]);
  const [filteredContactList, setFilteredContactList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      const filteredContacts = contactList.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phoneNumbers.some((number) => number.number.includes(searchQuery)),
      );
      setFilteredContactList(filteredContacts);
    } else {
      setFilteredContactList(contactList);
    }
  };
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
          if (data.length > 0) {
            setContactList(data);
            setFilteredContactList(data);
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching contacts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const renderContactItem = ({ item }) => (
    <Contact
      userData={item}
      isEditing={isEdit}
      selectedContacts={selectedContacts}
      setSelectedContacts={setSelectedContacts}
    />
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const noContactsFound = () => (
    <View style={styles.flex1}>
      <Text style={styles.title}>No contacts found.</Text>
    </View>
  );

  const onEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <Header onSearch={handleSearch} onEdit={onEdit} isSelected={selectedContacts.length} />
      <FlatList
        data={filteredContactList}
        keyExtractor={(item) => item?.id?.toString()}
        ListEmptyComponent={noContactsFound}
        renderItem={renderContactItem}
      />
    </View>
  );
};

export default FetchContactDetails;
