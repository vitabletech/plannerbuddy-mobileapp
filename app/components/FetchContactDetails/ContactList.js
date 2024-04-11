import React, { useState } from 'react';
import { List, Avatar, Checkbox } from 'react-native-paper';
import PropTypes from 'prop-types';

const toggleContactSelection = (setSelectedContacts, contactId) => {
  setSelectedContacts((prevSelectedContacts) => {
    if (prevSelectedContacts.includes(contactId)) {
      return prevSelectedContacts.filter((id) => id !== contactId);
    }
    return [...prevSelectedContacts, contactId];
  });
};

const selector = (selectedContacts, setSelectedContacts, contactId) => (
  <Checkbox
    status={selectedContacts.includes(contactId) ? 'checked' : 'unchecked'}
    onPress={() => toggleContactSelection(setSelectedContacts, contactId)}
  />
);

const Contact = React.memo(({ userData, isEditing }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const { name, phoneNumbers } = userData;
  const phoneNumber = phoneNumbers[0].number;
  const renderAvatar = () => <Avatar.Text size={34} label={name[0]} />;
  return (
    <List.Item
      title={name}
      description={phoneNumber}
      left={() => renderAvatar()}
      right={() => isEditing && selector(selectedContacts, setSelectedContacts, userData.name)}
    />
  );
});

Contact.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    phoneNumbers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        isPrimary: PropTypes.number,
        label: PropTypes.string,
        number: PropTypes.string,
        type: PropTypes.string,
      }),
    ),
  }).isRequired,
  isEditing: PropTypes.bool,
};

Contact.defaultProps = {
  isEditing: false,
};

export default Contact;
