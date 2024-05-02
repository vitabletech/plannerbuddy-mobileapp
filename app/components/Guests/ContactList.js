import React from 'react';
import { List, Avatar } from 'react-native-paper';
import PropTypes from 'prop-types';

const toggleContactSelection = (setSelectedContacts, contactId) => {
  setSelectedContacts((prevSelectedContacts) => {
    if (prevSelectedContacts.includes(contactId)) {
      return prevSelectedContacts.filter((id) => id !== contactId);
    }
    return [...prevSelectedContacts, contactId];
  });
};

const selector = (selectedContacts, contactId) =>
  selectedContacts.includes(contactId) ? <Avatar.Icon size={25} icon="check" /> : '';

const Contact = React.memo(({ userData, selectedContacts, setSelectedContacts }) => {
  const { name, phoneNumbers } = userData;
  if (!name || !phoneNumbers) return null;
  const phoneNumber = phoneNumbers[0].number;
  const renderAvatar = () => <Avatar.Text size={34} label={name ? name[0] : 'X'} />;
  return (
    <List.Item
      title={name}
      description={phoneNumber}
      onPress={() => toggleContactSelection(setSelectedContacts, userData.id)}
      left={() => renderAvatar()}
      right={() => selector(selectedContacts, userData.id)}
    />
  );
});

Contact.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
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
  selectedContacts: PropTypes.arrayOf(PropTypes.string),
  setSelectedContacts: PropTypes.func.isRequired,
};

Contact.defaultProps = {
  selectedContacts: [],
};

export default Contact;
