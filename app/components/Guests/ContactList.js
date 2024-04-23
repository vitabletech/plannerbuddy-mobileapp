import React from 'react';
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

const Contact = React.memo(({ userData, isEditing, selectedContacts, setSelectedContacts }) => {
  const { name, phoneNumbers } = userData;
  if (!name || !phoneNumbers) return null;

  const phoneNumber = phoneNumbers[0].number;
  const renderAvatar = () => <Avatar.Text size={34} label={name ? name[0] : '?'} />;
  return (
    <List.Item
      title={name}
      description={phoneNumber}
      left={() => renderAvatar()}
      right={() => isEditing && selector(selectedContacts, setSelectedContacts, userData?.name)}
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
        number: PropTypes.string.isRequired,
        type: PropTypes.string,
      }),
    ),
  }).isRequired,
  isEditing: PropTypes.bool,
  selectedContacts: PropTypes.arrayOf(PropTypes.string),
  setSelectedContacts: PropTypes.func.isRequired,
};

Contact.defaultProps = {
  selectedContacts: [],
  isEditing: false,
};

export default Contact;
