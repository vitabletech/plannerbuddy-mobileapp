import React from 'react';
import * as Contacts from 'expo-contacts';
import { View, Linking, Platform } from 'react-native';
import { Button, Text } from 'react-native-paper';

export const noContactsFound = (classes) => <Text style={classes}>No contacts found.</Text>;

export const requestPermission = async (fetchContacts, setPermissionDenied) => {
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
export const PermissionDenied = (askPermission, bodyClass, textColor) => {
  return (
    <View style={bodyClass}>
      <Text style={textColor}>Permission denied. Please allow access to contacts.</Text>
      <Button title="Request Permission" onPress={askPermission} />
    </View>
  );
};

export const filterContacts = (searchQuery, contactList, setFilteredContactList) => {
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
