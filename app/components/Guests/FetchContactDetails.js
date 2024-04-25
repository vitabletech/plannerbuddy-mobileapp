import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Card, ActivityIndicator } from 'react-native-paper';
import { useContacts } from '../../hooks/useContacts';
import Contact from './ContactList';
import commonStyles from '../../styles/common.style';
import Header from './Header';
import { noContactsFound, requestPermission, PermissionDenied, filterContacts } from './utils';

const FetchContactDetails = () => {
  const styles = commonStyles();
  const { contactList, isLoading, fetchContacts } = useContacts();
  const [filteredContactList, setFilteredContactList] = useState(contactList);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [permissionDenied, setPermissionDenied] = useState(true);

  useEffect(() => {
    setFilteredContactList(contactList);
  }, [contactList]);

  const handleSearch = (searchQuery) => {
    filterContacts(searchQuery, contactList, setFilteredContactList);
  };

  const renderContactItem = ({ item }) => (
    <Contact
      userData={item}
      selectedContacts={selectedContacts}
      setSelectedContacts={setSelectedContacts}
    />
  );

  if (isLoading) {
    return <ActivityIndicator style={styles.flex1} />;
  }
  if (permissionDenied) {
    return PermissionDenied(
      requestPermission(fetchContacts, setPermissionDenied),
      styles.flex1,
      styles.title,
    );
  }

  return (
    <View style={styles.flex1}>
      <Header
        onSearch={handleSearch}
        isSelected={selectedContacts.length}
        setSelectedContacts={setSelectedContacts}
      />
      <Card>
        <Card.Content>
          <FlatList
            data={filteredContactList}
            keyExtractor={(item) => item?.id?.toString()}
            ListEmptyComponent={noContactsFound(styles.title)}
            renderItem={renderContactItem}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default FetchContactDetails;
