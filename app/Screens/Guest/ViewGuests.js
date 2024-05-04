import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import GuestLists from '../../components/GuestLists/GuestLists';
import VTFAB from '../../components/VTFAB/VTFAB';
import commonStyles from '../../styles/common.style';
import AddGuestModal from '../../components/AddGuest/AddGuest';
import { useGuestContext } from '../../store/GuestContext';
import getStyles from '../../styles/settings.style';

const ViewGuests = () => {
  const styles = { ...getStyles(), ...commonStyles() };
  const { showModal, openDialog } = useGuestContext();
  console.log('showModal', showModal);
  const addGuestOptions = [
    {
      icon: 'account-multiple-plus-outline',
      label: 'Add Manually',
      onPress: openDialog,
    },
    { icon: 'account-sync-outline', label: 'Sync from Contacts', onPress: () => {} },
  ];

  return (
    <VTFAB actionsButton={addGuestOptions} />
      {showModal && <AddGuestModal styles={styles} />}
      <View style={styles.flex1}>
        <GuestLists selectMode={false} />
      </View>
  );
};

export default ViewGuests;
