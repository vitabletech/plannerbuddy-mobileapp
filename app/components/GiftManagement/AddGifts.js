import React, { useRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme, Text, TextInput, Button, Card } from 'react-native-paper';
import commonStyles from '../../styles/common.style';
import getStyles from '../Guests/styles';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import VTDropDown from '../VTDropDown/VTDropDown';
import { useEventContext } from '../../store/EventContext';
import { fetchUsers } from '../../utils/utils';

const AddGifts = () => {
  const theme = useTheme();
  const { events } = useEventContext();
  const styles = { ...getStyles(), ...commonStyles() };
  const [items, setItems] = useState([]);
  const [guestList, setGuestList] = useState([]);

  useEffect(() => {
    const transformedEvents = events.map((event) => ({
      label: event.name,
      value: event.id,
    }));
    setItems(transformedEvents);
  }, [events]);

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      const userData = await fetchUsers(1);
      const transformedGuests = userData.users.map((guest) => ({
        label: guest.firstName,
        value: guest.id,
      }));
      setGuestList([...transformedGuests, { label: 'Add New Guest', value: 'addNew' }]);
    };
    fetchAndSetUsers();
  }, []);

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
  // Create refs for the inputs
  const emailInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);
  const addressInputRef = useRef(null);

  const handleClearForm = () => {
    nameInput.reset('');
    emailInput.reset();
    phoneInput.reset();
    addressInput.reset();
  };

  const handleAddGifts = () => {
    nameInput.onBlur();
    emailInput.onBlur();
    addressInput.onBlur();
    phoneInput.onBlur();
    if (nameInput.value && emailInput.value && addressInput.value && phoneInput.value) {
      console.log('Add Gifts');
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Card>
        <Card.Content>
          <VTDropDown items={items} />
          <VTDropDown label="Select Guest" items={guestList} />
          <VTTextInput
            label="Guest Full Name"
            {...nameInput}
            left={<TextInput.Icon icon="account" />}
            onSubmitEditing={() => emailInputRef.current.focus()}
          />
          <VTTextInput
            label="Phone Number"
            ref={phoneNumberInputRef}
            {...phoneInput}
            left={<TextInput.Icon icon="phone" />}
            onSubmitEditing={() => addressInputRef.current.focus()}
          />
          <VTTextInput
            label="Email"
            ref={emailInputRef}
            {...emailInput}
            left={<TextInput.Icon icon="email" />}
            onSubmitEditing={() => phoneNumberInputRef.current.focus()}
          />
          <VTTextInput
            label="Address"
            ref={phoneNumberInputRef}
            {...addressInput}
            left={<TextInput.Icon icon="home" />}
          />
          <View style={styles.justify}>
            <Button icon="delete" mode="contained" onPress={handleClearForm} style={styles.mr10}>
              <Text style={{ color: theme.colors.onPrimary }}>Clear</Text>
            </Button>
            <Button icon="content-save" mode="contained" onPress={handleAddGifts}>
              <Text style={{ color: theme.colors.onPrimary }}>Save Guests</Text>
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default AddGifts;
