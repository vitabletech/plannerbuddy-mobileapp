import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { Button, Dialog } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import InputDialog from '../InputDialog/InputDialog';
import AddGuests from '../Guests/AddGuests';
import { guestActions } from '../../store/GuestContext';
import useInput from '../../hooks/useInput';
import { addGuest, updateGuest } from '../../utils/apiCalls';
import {
  validateEmail,
  validateName,
  validatePhone,
  validateAddress,
} from '../../utils/validations';

const AddGuestModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.guest.showModal);
  const guestEditIndex = useSelector((state) => state.guest.editIndex);
  const nameInput = useInput('', validateName);
  const emailInput = useInput('', validateEmail);
  const addressInput = useInput('', validateAddress);
  const phoneInput = useInput('', validatePhone);
  const guests = useSelector((state) => state.guest.guests);

  useEffect(() => {
    const selectedGuest = guests.find((g) => g.id === guestEditIndex);
    nameInput.setValue(selectedGuest?.name || '');
    emailInput.setValue(selectedGuest?.email || '');
    addressInput.setValue(selectedGuest?.address || '');
    phoneInput.setValue(selectedGuest?.phone || '');
  }, [guestEditIndex]);

  const closeDialog = () => dispatch(guestActions.closeDialog());
  const handleAddGuest = () => {
    nameInput.onBlur();
    phoneInput.onBlur();
    if (nameInput.value && phoneInput.value) {
      const GuestData = {};
      GuestData.name = nameInput.value;
      GuestData.phoneNumber = phoneInput.value;
      if (addressInput.value) GuestData.address = addressInput.value;
      if (emailInput.value) GuestData.email = emailInput.value;
      addGuest(GuestData).then((response) => {
        if (!response.error) {
          dispatch(
            guestActions.addGuest({
              guest: {
                id: response.data.guestId,
                name: nameInput.value,
                phone: phoneInput.value,
                address: addressInput.value,
                email: emailInput.value,
              },
            }),
          );
          dispatch(guestActions.closeDialog());
        }
        Alert.alert(response.error ? 'Fail' : 'Success', response.message);
      });
    }
  };

  const handleUpdateGuest = () => {
    if (nameInput.value && phoneInput.value) {
      const GuestData = {};
      GuestData.name = nameInput.value;
      GuestData.phoneNumber = phoneInput.value;
      if (addressInput.value) GuestData.address = addressInput.value;
      if (emailInput.value) GuestData.email = emailInput.value;
      updateGuest(GuestData, guestEditIndex).then((response) => {
        if (!response.error) {
          dispatch(
            guestActions.updateGuest({
              guest: {
                id: guestEditIndex,
                name: nameInput.value,
                phone: phoneInput.value,
                address: addressInput.value,
                email: emailInput.value,
              },
            }),
          );
          dispatch(guestActions.closeDialog());
          dispatch(guestActions.setEditIndex({ editIndex: null }));
          Alert.alert('Success', 'Guest has been updated successfully');
        } else {
          Alert.alert('Error', 'There was an error updating the guest');
        }
      });
    }
  };

  return (
    <InputDialog visible={showModal} onDismiss={() => {}}>
      <Dialog.Title>{guestEditIndex !== null ? 'Edit Guest' : 'Add Guest'}</Dialog.Title>
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
        {guestEditIndex === null ? (
          <Button onPress={handleAddGuest}>Save</Button>
        ) : (
          <Button onPress={handleUpdateGuest}>Update</Button>
        )}
      </Dialog.Actions>
    </InputDialog>
  );
};

export default AddGuestModal;
