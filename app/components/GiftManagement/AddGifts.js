import React, { useRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Dialog } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from '../../styles/common.style';
import getStyles from '../Guests/styles';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import VTDropDown from '../VTDropDown/VTDropDown';
import { fetchGuest } from '../../store/GuestContext';
import { giftsActions } from '../../store/reducers/giftSlice';
import { fetchEvents } from '../../store/EventContext';

const AddGifts = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const gifts = useSelector((state) => state.gift.gifts);
  const styles = { ...getStyles(), ...commonStyles() };
  const page = useSelector((state) => state.guest.page);
  const guests = useSelector((state) => state.guest.guests);
  const [guestList, setGuestList] = useState([]);
  const [eventsList, setEventsList] = useState([]);

  const [selectedGuest, setSelectedGuest] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    const transformedGuest = guests.map((guest) => ({ label: guest.name, value: guest.id }));
    setGuestList(transformedGuest);
  }, [guests]);

  useEffect(() => {
    const transformedEvents = events.map((event) => ({
      label: event.name,
      value: event.id,
    }));
    setEventsList(transformedEvents);
  }, [events]);

  useEffect(() => {
    dispatch(fetchGuest({ page }));
  }, [page]);

  useEffect(() => {
    dispatch(fetchEvents({ page }));
  }, [page]);

  const amountInput = useInput('', (value) => (value?.trim() === '' ? 'Enter valid amount' : null));
  const notesInput = useInput('', (value) =>
    value.trim() !== '' ? null : 'Enter something to remember',
  );
  // Create refs for the inputs
  const notesRef = useRef(null);

  const closeDialog = () => dispatch(giftsActions.closeDialog());

  const handleAddGift = () => {
    const giftDetails = {
      giftId: gifts.length,
      eventId: selectedEvent,
      guestId: selectedGuest,
      amount: amountInput.value,
      notes: notesInput.value,
    };
    dispatch(giftsActions.addGift({ gift: { ...giftDetails } }));
    closeDialog();
  };

  return (
    <View style={styles.flex1}>
      <View>
        <KeyboardAwareScrollView
          style={styles.profileContainer}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
        >
          <Dialog.Title>Add Gift</Dialog.Title>
          <Dialog.Content>
            <VTDropDown items={eventsList} value={selectedEvent} onChange={setSelectedEvent} />
            <VTDropDown
              label="Select Guest"
              items={guestList}
              value={selectedGuest}
              onChange={setSelectedGuest}
            />

            <VTTextInput
              label="Enter Amount"
              {...amountInput}
              keyboardType="numeric"
              left={<TextInput.Icon icon="cash-multiple" />}
              onSubmitEditing={() => notesRef.current.focus()}
            />

            <TextInput
              label="Notes"
              mode="outlined"
              value={notesInput}
              ref={notesRef}
              {...notesInput}
              multiline
              left={<TextInput.Icon icon="text" />}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            <Button onPress={handleAddGift}>Save</Button>
          </Dialog.Actions>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default AddGifts;
