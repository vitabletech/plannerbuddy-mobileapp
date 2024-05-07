import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import GuestLists from '../../components/GuestLists/GuestLists';
import VTFAB from '../../components/VTFAB/VTFAB';
import commonStyles from '../../styles/common.style';
import AddGuestModal from '../../components/AddGuest/AddGuest';
import getStyles from '../../styles/settings.style';
import { guestActions } from '../../store/GuestContext';
import WithErrorBoundary from '../../components/ErrorBoundary/WithErrorBoundary';

const GuestListsWithErrorBoundary = WithErrorBoundary(GuestLists);

const ViewGuests = () => {
  const styles = { ...getStyles(), ...commonStyles() };
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.guest.showModal);
  const openDialog = () => dispatch(guestActions.openDialog());
  const addGuestOptions = [
    {
      icon: 'account-multiple-plus-outline',
      label: 'Add Manually',
      onPress: openDialog,
    },
    { icon: 'account-sync-outline', label: 'Sync from Contacts', onPress: () => {} },
  ];

  return (
    <VTFAB actionsButton={addGuestOptions}>
      {showModal && <AddGuestModal styles={styles} />}
      <View style={styles.flex1}>
        <GuestListsWithErrorBoundary selectMode={false} />
      </View>
    </VTFAB>
  );
};

export default ViewGuests;
