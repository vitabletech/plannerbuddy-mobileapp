import React from 'react';
import { List, Avatar } from 'react-native-paper';
import PropTypes from 'prop-types';

const Contact = React.memo(({ userData }) => {
  const { name, phoneNumbers } = userData;
  const phoneNumber = phoneNumbers[0].number;
  const renderAvatar = () => <Avatar.Text size={34} label={name[0]} />;
  return <List.Item title={name} description={phoneNumber} left={() => renderAvatar()} />;
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
};
export default Contact;
