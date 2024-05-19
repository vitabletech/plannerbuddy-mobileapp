import React from 'react';
import { Avatar, Card, Text, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { AvatarText, askForConfirmation } from '../../utils/utils';
import { guestActions } from '../../store/GuestContext';
import commonStyles from '../../styles/common.style';
import { deleteGuest } from '../../utils/apiCalls';

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

const UserDataList = ({ userData, selectedContacts, setSelectedContacts, selectMode }) => {
  const dispatch = useDispatch();
  const styles = commonStyles();

  const handleRemoveEvent = () => {
    askForConfirmation(
      'Delete',
      'Do you really want to remove this guest? \nThis action will also remove them from the Event and Gift lists.',
      () => {
        if (userData?.id) {
          deleteGuest(userData?.id).then((response) => {
            if (!response.error) {
              dispatch(guestActions.removeGuest({ guestId: userData?.id }));
            }
            Alert.alert(!response.error ? 'Success' : 'Fail', response.message);
          });
        }
      },
    );
  };

  const handleEditGuest = () => {
    dispatch(guestActions.setEditIndex({ editIndex: userData?.id }));
    dispatch(guestActions.openDialog());
  };

  const cardOptions = () => {
    return (
      <View style={styles.flexRow}>
        <IconButton icon="pencil-outline" onPress={handleEditGuest} />
        <IconButton icon="delete-outline" onPress={handleRemoveEvent} />
      </View>
    );
  };

  return (
    <Card
      style={styles.guestCardMargin}
      onPress={() => toggleContactSelection(setSelectedContacts, userData.id)}
    >
      <Card.Title
        title={`${userData?.name} - ${userData?.id}`}
        subtitle={`Contact : ${userData?.phone} `}
        left={(props) =>
          AvatarText({
            ...props,
            size: 45,
            label: (userData?.name || '')[0],
            labelStyle: { color: 'white' },
          })
        }
        right={() => (!selectMode ? cardOptions() : selector(selectedContacts, userData.id))}
        rightStyle={styles.guestCardRightButtonMargin}
      />
      <Card.Content>
        <Text variant="bodyMedium">{`Address : ${userData?.address || '---'} `}</Text>
      </Card.Content>
    </Card>
  );
};
UserDataList.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    image: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  selectedContacts: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedContacts: PropTypes.func.isRequired,
  selectMode: PropTypes.bool.isRequired,
};

export default UserDataList;
