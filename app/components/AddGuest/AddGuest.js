import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Button, Dialog } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import InputDialog from '../InputDialog/InputDialog';
import AddGuests from '../Guests/AddGuests';
import { guestActions } from '../../store/GuestContext';
import useInput from '../../hooks/useInput';
import { addGuest } from '../../utils/apiCalls';

const AddGuestModal = () => {
  const dispatch = useDispatch();
  const guestEditIndex = useSelector((state) => state.guest.editIndex);
  let nameInput = useInput('', (value) => (value.trim() ? null : 'Name is required'));
  let emailInput = useInput('', (value) =>
    value?.trim() === '' || (value.trim() && /\S+@\S+\.\S+/.test(value))
      ? null
      : 'Please enter a valid email',
  );
  let addressInput = useInput('', (value) =>
    value?.trim() === '' ? null : 'Please Enter Valid Address',
  );
  let phoneInput = useInput('', (value) =>
    value?.trim() !== '' && value.length === 10 ? null : 'Enter Valid Phone Number',
  );
  const guests = useSelector((state) => state.guest.guests);
  // const [guest, setGuest] = useState({
  //   name: '',
  //   phone: '',
  //   address: '',
  //   email: '',
  // });

  useEffect(() => {
    console.log('guests : ', guests);
    console.log('guestEditIndex : ', guestEditIndex);
    const selectedGuest = guests.find((g) => g.id === guestEditIndex);
    console.log(selectedGuest);
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
          Alert.alert('Success', 'New guest has been added successfully');
        } else {
          Alert.alert('Error', 'There was an error adding the guest');
        }
      });
    }
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
