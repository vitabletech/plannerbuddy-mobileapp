import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Linking, Platform } from 'react-native';
import { Card, Text } from 'react-native-paper';
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
  const [permissionDenied, setPermissionDenied] = useState(false);

  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      const filteredContacts = contactList.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (contact.phoneNumbers &&
            contact.phoneNumbers.some((number) => number.number.includes(searchQuery))),
      );
      setFilteredContactList(filteredContacts);
    } else {
      setFilteredContactList(contactList);
    }
  };

  const fetchContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'denied') {
        setPermissionDenied(true);
      } else {
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

  useEffect(() => {
    fetchContacts();
  }, []);

  const requestPermission = async () => {
    const { status: newStatus } = await Contacts.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      } else {
        Linking.openSettings();
      }
    } else {
      fetchContacts();
      setPermissionDenied(false);
    }
  };

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

  if (permissionDenied) {
    return (
      <View style={styles.flex1}>
        <Text style={styles.title}>Permission denied. Please allow access to contacts.</Text>
        <Button title="Request Permission" onPress={requestPermission} />
      </View>
    );
  }

  const noContactsFound = () => <Text style={styles.title}>No contacts found.</Text>;

  const onEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <Header
        onSearch={handleSearch}
        onEdit={onEdit}
        isSelected={selectedContacts.length}
        setSelectedContacts={setSelectedContacts}
      />
      <Card>
        <Card.Content>
          <FlatList
            data={filteredContactList}
            keyExtractor={(item) => item?.id?.toString()}
            ListEmptyComponent={noContactsFound}
            renderItem={renderContactItem}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default FetchContactDetails;
