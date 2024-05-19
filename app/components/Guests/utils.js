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
export const PermissionDenied = (fetchContacts, setPermissionDenied, bodyClass, textColor) => {
  return (
    <View style={bodyClass}>
      <Text style={textColor}>Permission denied. Please allow access to contacts.</Text>
      <Button onPress={() => requestPermission(fetchContacts, setPermissionDenied)}>
        Request Permission
      </Button>
    </View>
  );
};

export const filterContacts = (searchQuery, contactList, setFilteredContactList) => {
  if (searchQuery) {
    const filteredContacts = contactList.filter((contact) => {
      let name;
      if (contact.firstName || contact.lastName) {
        name = `${contact?.firstName} ${contact?.lastName}`;
      } else if (contact.name) {
        name = contact.name;
      }
      return (
        (name && name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (contact.phoneNumbers &&
          contact.phoneNumbers.some((number) => number.number.includes(searchQuery)))
      );
    });
    setFilteredContactList(filteredContacts);
  } else {
    setFilteredContactList(contactList);
  }
};

export const normalizePhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/^\+91/, '').replace(/^0/, '').trim().replace(/\D/g, '');
};
