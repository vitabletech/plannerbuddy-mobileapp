import React from 'react';
import { Avatar, Card, IconButton, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { askForConfirmation } from '../../utils/utils';
import { guestActions } from '../../store/GuestContext';
import commonStyles from '../../styles/common.style';
import getStyles from './style';
import { deleteGuest } from '../../utils/apiCalls';

const UserDataList = ({ userData }) => {
  const dispatch = useDispatch();
  const styles = { ...getStyles(), ...commonStyles() };

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

  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Avatar.Text
          size={45}
          label={(userData?.name || '')[0]}
          style={styles.avatar}
          labelStyle={styles.avatarLabel}
        />
        <View style={styles.textContent}>
          <Text style={styles.name}>{userData?.name}</Text>
          <View style={styles.row}>
            <Avatar.Icon size={24} icon="phone" style={styles.icon} color='black' />
            <Text style={styles.phone}>{userData?.phone}</Text>
          </View>
          <View style={styles.row}>
            <Avatar.Icon size={24} icon="map-marker" style={styles.icon} color='black' />
            <Text style={styles.address}>{userData?.address}</Text>
          </View>
        </View>
        <View style={styles.iconButtons}>
          <IconButton icon="pencil-outline" onPress={handleEditGuest} color />
          <IconButton icon="delete-outline" onPress={handleRemoveEvent} color />
        </View>
      </View>
    </Card>
  );
};

UserDataList.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};

export default UserDataList;
