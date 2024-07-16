/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect, useState } from 'react';
import { View, Alert } from 'react-native'; // Import Alert from react-native
import { TextInput, Button, Dialog, Switch, Text, useTheme } from 'react-native-paper';
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
import { addGift } from '../../utils/apiCalls';

const AddGifts = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const events = useSelector((state) => state.event.events);
  const styles = { ...getStyles(), ...commonStyles() };
  const page = useSelector((state) => state.guest.page);
  const guests = useSelector((state) => state.guest.guests);
  const [guestList, setGuestList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [isYourGift, setIsYourGift] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [isGuestValid, setIsGuestValid] = useState(false); // State for guest validation
  const [isEventValid, setIsEventValid] = useState(false); // State for event validation

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

  const amountInput = useInput('', (value) => {
    if (value.trim() === '') {
      return 'Enter valid amount';
    }
    if (Number.isNaN(value)) {
      return 'Only numbers are allowed';
    }
    return null;
  });
  const notesInput = useInput('', () => {});
  // Create refs for the inputs
  const notesRef = useRef(null);

  const closeDialog = () => dispatch(giftsActions.closeDialog());

  const handleAddGift = () => {
    if (!isGuestValid || !isEventValid) {
      // Check if guest and event are selected
      Alert.alert('Validation Error', 'Please select guest and event');
      return;
    }

    const giftDetails = {};

    if (selectedEvent) giftDetails.eventId = selectedEvent;
    if (selectedGuest) giftDetails.guestId = selectedGuest;
    if (amountInput.value) giftDetails.amount = amountInput.value;
    if (notesInput.value) giftDetails.note = notesInput.value;
    giftDetails.isYourGift = isYourGift ? 'yes' : 'no';

    addGift(giftDetails).then((response) => {
      if (response.data.giftId) {
        dispatch(
          giftsActions.addGift({
            gift: {
              ...giftDetails,
              giftId: response.data.giftId,
              guestName: guestList.find((guest) => guest.value === selectedGuest).label,
              eventName: eventsList.find((event) => event.value === selectedEvent).label,
            },
          }),
        );
      }
      Alert.alert(!response.error ? 'Success' : 'Fail', response.message);
      closeDialog();
    });
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
            <VTDropDown
              items={eventsList}
              value={selectedEvent}
              onChange={(value) => {
                setSelectedEvent(value);
                setIsEventValid(!!value);
              }}
              label={eventsList.length ? 'Select Event' : 'Please Add Event First'}
            />
            <VTDropDown
              label={guestList.length ? 'Select Guest' : 'Please Add Guest First'}
              items={guestList}
              value={selectedGuest}
              onChange={(value) => {
                setSelectedGuest(value);
                setIsGuestValid(!!value);
              }}
            />
            <View style={{ margin: 3 }} />
            <VTTextInput
              label="Enter Amount"
              {...amountInput}
              keyboardType="numeric"
              left={<TextInput.Icon label="cash-multiple" icon="cash-multiple" />}
              onSubmitEditing={() => notesRef.current.focus()}
            />
            <View style={{ margin: 5 }} />
            <TextInput
              label="Notes"
              mode="flat"
              value={notesInput}
              ref={notesRef}
              {...notesInput}
              multiline
              theme={{ colors: { primary: theme.colors.onSurface } }}
              left={<TextInput.Icon icon="text" label="text" />}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <View style={styles.giftContainer}>
              <View style={styles.giftToggle}>
                <Text>Received</Text>
                <Switch value={isYourGift} onValueChange={() => setIsYourGift((state) => !state)} />
              </View>
              <View style={styles.giftSaveButton}>
                <Button onPress={closeDialog}>
                  <Text>Cancel</Text>
                </Button>
                <Button onPress={handleAddGift}>
                  <Text>Save</Text>
                </Button>
              </View>
            </View>
          </Dialog.Actions>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default AddGifts;
