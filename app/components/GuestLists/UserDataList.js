import React from 'react';
import { List, Avatar } from 'react-native-paper';
import PropTypes from 'prop-types';
import RenderRender, { RenderAlphabet } from '../RenderAvatar/RenderAvatar';

const toggleContactSelection = (setSelectedContacts, contactId) => {
  setSelectedContacts((prevSelectedContacts) => {
    if (prevSelectedContacts.includes(contactId)) {
      return prevSelectedContacts.filter((id) => id !== contactId);
    }
    return [...prevSelectedContacts, contactId];
  });
};

const selector = (selectedContacts, contactId) =>
  selectedContacts?.includes(contactId) ? <Avatar.Icon size={25} icon="check" /> : '';

const UserDataList = React.memo(
  ({ userData, selectedContacts, setSelectedContacts, selectMode }) => (
    <List.Item
      title={`${userData?.firstName} ${userData?.lastName}`}
      description={`Contact : ${userData?.phone} `}
      onPress={() => toggleContactSelection(setSelectedContacts, userData.id)}
      left={(props) => (
        <Avatar.Text
          size={45}
          labelStyle={{ color: 'white' }}
          {...props}
          label={userData?.firstName[0]}
        />
      )}
      right={() => (!selectMode ? '' : selector(selectedContacts, userData.id))}
    />
  ),
);
UserDataList.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default UserDataList;
