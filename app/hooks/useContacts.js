import { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';

export const useContacts = () => {
  const [contactList, setContactList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccess, setIsAccess] = useState(false);

  const fetchContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'denied') {
        throw new Error('Permission denied');
      }
      setIsAccess(true);
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContactList(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return { contactList, isLoading, fetchContacts, isAccess };
};
