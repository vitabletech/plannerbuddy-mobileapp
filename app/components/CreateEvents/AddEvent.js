import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Alert } from 'react-native';
import {
  Dialog,
  Portal,
  Button,
  TextInput,
  HelperText,
  SegmentedButtons,
} from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useSelector, useDispatch } from 'react-redux';
import getStyles from './styles';
import { fetchEventDetails } from '../../utils/constant';
import InputDialog from '../InputDialog/InputDialog';
import { eventActions } from '../../store/EventContext';
import { addEvent, updateEvent } from '../../utils/apiCalls';
import VTDropDown from '../VTDropDown/VTDropDown';

const AddEventModal = () => {
  let EVENT = fetchEventDetails();
  const [eventState, setEventState] = useState('ownEvent');
  const [selectedGuest, setSelectedGuest] = useState('');
  const totalGuests = useSelector((state) => state.guest.guests);
  const [guestList, setGuestList] = useState(totalGuests);

  useEffect(() => {
    const transformedGuests = totalGuests.map((guest) => ({
      label: guest?.name,
      value: guest?.id,
    }));
    setGuestList([...transformedGuests]);
  }, [totalGuests]);

  const dispatch = useDispatch();
  const styles = getStyles();

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [event, setEvent] = useState(EVENT);
  const [error, setError] = useState(false);

  const dateInputRef = useRef(null);
  const addressInputRef = useRef(null);

  const events = useSelector((state) => state.event.events);
  const mode = useSelector((state) => state.event.mode);
  const editIndex = useSelector((state) => state.event.editIndex);
  const showModal = useSelector((state) => state.event.showModal);

  const closeDialog = () => dispatch(eventActions.closeDialog());

  useEffect(() => {
    if (mode === 'edit') {
      const selectedEvent = events.find((eve) => eve.id === editIndex);
      setEvent(selectedEvent);
      setEventState(selectedEvent.isYourEvent === 'yes' ? 'ownEvent' : 'otherEvent');
      if (selectedEvent.isYourEvent === 'no') setSelectedGuest(selectedEvent.guests[0].guestId);
      setSelectedDate(new Date(selectedEvent.date));
    }
  }, [mode]);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleChance = (id, e) => {
    setEvent(() => ({ ...event, [id]: e }));
  };

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setSelectedDate(params.date);
      setEvent((current) => ({ ...current, date: params.date.toDateString() }));
    },
    [setOpen, setSelectedDate],
  );

  const handleSelectDate = () => {
    setOpen((state) => !state);
  };

  const validateInput = useCallback(() => {
    const errors = {};
    if (!event.name.trim()) {
      errors.name = 'Event name is required';
    }
    if (!event.address.trim()) {
      errors.address = 'Please enter a valid address';
    }
    if (!selectedDate || selectedDate === undefined) {
      errors.date = 'Please select a date';
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  }, [event, selectedDate]);

  const handleAddEvent = useCallback(() => {
    const isValid = validateInput();
    if (isValid) {
      const isYourEvent = eventState === 'ownEvent' ? 'yes' : 'no';
      if (isYourEvent === 'no' && !selectedGuest) {
        // event.guests[{ guestId: selectedGuest, name: 'Guest', phone: '1234567890'}];
        Alert.alert('Error', 'Please select a guest');
        return;
      }
      addEvent({
        isYourEvent,
        guestId: +selectedGuest ?? null,
        eventName: event.name,
        eventDate: new Date(selectedDate).toISOString(),
        eventLocation: event.address,
      }).then((response) => {
        if (!response.error) {
          dispatch(
            eventActions.addEvent({
              event: {
                ...event,
                id: response.eventId,
                isYourEvent,
                date: new Date(selectedDate).toISOString(),
              },
            }),
          );
          closeDialog();
        }
        Alert.alert(response.error ? 'Fail' : 'Success', response.message);
      });
    }
  }, [event, selectedDate, validateInput, selectedGuest]);

  const handleCloseDialog = useCallback(() => {
    EVENT = { id: '', name: '', address: '', date: '' };
    setEvent(EVENT);
    dispatch(eventActions.setEditIndex({ idx: null }));
    dispatch(eventActions.setMode({ mode: null }));
    closeDialog();
  }, [closeDialog]);

  const handleUpdateEvent = useCallback(() => {
    updateEvent({
      eventName: event.name,
      eventDate: new Date(event.date).toISOString(),
      eventLocation: event.address,
      eventId: event.id,
    }).then((response) => {
      if (!response.error) {
        dispatch(eventActions.updateEvent({ id: event.id, event: { ...event } }));
        closeDialog();
      }
    });
  }, [event]);
  return (
    <Portal>
      <InputDialog visible={showModal} onDismiss={handleCloseDialog}>
        <Dialog.Title>{mode === 'edit' ? 'Edit Event' : 'Create New Event'}</Dialog.Title>
        {mode !== 'edit' && (
          <SegmentedButtons
            value={eventState}
            onValueChange={setEventState}
            buttons={[
              {
                value: 'ownEvent',
                label: 'Own Event',
              },
              {
                value: 'otherEvent',
                label: 'Other Event',
              },
            ]}
            style={styles.paddedContainer}
          />
        )}
        <Dialog.Content style={styles.contentContainer}>
          <TextInput
            style={styles.input}
            mode="outlined"
            value={event.name}
            label="Event name"
            onChangeText={(e) => handleChance('name', e)}
            onSubmitEditing={() => addressInputRef.current.focus()}
          />
          <HelperText type="error" visible={!!error.name}>
            {error.name}
          </HelperText>

          <TextInput
            ref={addressInputRef}
            style={styles.input}
            mode="outlined"
            value={event.address}
            label="Address"
            onChangeText={(e) => handleChance('address', e)}
            onSubmitEditing={() => dateInputRef.current.focus()}
          />
          <HelperText type="error" visible={!!error.address}>
            {error.address}
          </HelperText>
          <TextInput
            ref={dateInputRef}
            style={styles.input}
            mode="outlined"
            label="Date"
            value={selectedDate ? selectedDate.toDateString() : ''}
            onFocus={handleSelectDate}
          />
          <View>
            <DatePickerModal
              locale="en"
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={selectedDate}
              onConfirm={onConfirmSingle}
              presentationStyle="pageSheet"
            />
            <HelperText type="error" visible={selectedDate === undefined}>
              {error.date}
            </HelperText>
          </View>
          {eventState === 'otherEvent' && (
            <VTDropDown
              label={guestList.length ? 'Select Guest' : 'No Guest Available'}
              items={guestList}
              value={selectedGuest}
              onChange={setSelectedGuest}
            />
          )}
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={closeDialog}>Cancel</Button>
          {mode === 'edit' ? (
            <Button onPress={handleUpdateEvent}>Update</Button>
          ) : (
            <Button onPress={handleAddEvent}>Ok</Button>
          )}
        </Dialog.Actions>
      </InputDialog>
    </Portal>
  );
};

export default AddEventModal;
