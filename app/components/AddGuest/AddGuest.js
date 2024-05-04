import React from 'react';
import { Button, Dialog } from 'react-native-paper';
import InputDialog from '../InputDialog/InputDialog';
import AddGuests from '../Guests/AddGuests';
import { useGuestContext } from '../../store/GuestContext';

const AddGuestModal = ({ styles }) => {
  const { closeDialog, addGuest } = useGuestContext();
  return (
    <InputDialog visible onDismiss={() => {}}>
      <Dialog.Title>Add Guest</Dialog.Title>

      <Dialog.Content style={{ flex: 1 }}>
        <AddGuests />
      </Dialog.Content>

      <Dialog.Actions>
        <Button onPress={closeDialog}>Cancel</Button>
        <Button onPress={() => addGuest()}>Save</Button>
      </Dialog.Actions>
    </InputDialog>
  );
};

export default AddGuestModal;
