import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import * as Contacts from 'expo-contacts';
import Contact from './ContactList';
import commonStyles from '../../styles/common.style';

const FetchContactDetails = () => {
  const styles = commonStyles();
  const [contactList, setContactList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const renderContactItem = ({ item }) => <Contact userData={item} />;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (contactList.length === 0) {
    return (
      <View style={styles.flex1}>
        <Text style={styles.title}>No contacts found.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={contactList}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderContactItem}
      />
    </View>
  );
};

export default FetchContactDetails;
