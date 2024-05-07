import React from 'react';
import { Button, Dialog } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import InputDialog from '../InputDialog/InputDialog';
import AddGuests from '../Guests/AddGuests';
import { guestActions } from '../../store/GuestContext';
import useInput from '../../hooks/useInput';

const AddGuestModal = () => {
  const dispatch = useDispatch();

  const nameInput = useInput('', (value) => (value.trim() ? null : 'Name is required'));
  const emailInput = useInput('', (value) =>
    value.trim() === '' || (value.trim() && /\S+@\S+\.\S+/.test(value))
      ? null
      : 'Please enter a valid email',
  );
  const addressInput = useInput('', (value) =>
    value.trim() === '' || (value.trim() !== '' && value.length >= 8)
      ? null
      : 'Please Enter Valid Address',
  );
  const phoneInput = useInput('', (value) =>
    value.trim() !== '' && value.length === 10 ? null : 'Enter Valid Phone Number',
  );

  const closeDialog = () => dispatch(guestActions.closeDialog());
  const handleAddGuest = () => {
    dispatch(
      guestActions.addGuest({
        guest: {
          name: nameInput.value,
          phone: phoneInput.value,
          address: addressInput.value,
          email: emailInput.value,
        },
      }),
    );
  };

  return (
    <InputDialog visible onDismiss={() => {}}>
      <Dialog.Title>Add Guest</Dialog.Title>
      <Dialog.Content>
        <AddGuests
          nameInput={nameInput}
          emailInput={emailInput}
          addressInput={addressInput}
          phoneInput={phoneInput}
        />
      </Dialog.Content>

      <Dialog.Actions>
        <Button onPress={closeDialog}>Cancel</Button>
        <Button onPress={handleAddGuest}>Save</Button>
      </Dialog.Actions>
    </InputDialog>
  );
};

export default AddGuestModal;
