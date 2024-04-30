import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Dialog, Portal, Button, TextInput, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DatePickerModal } from 'react-native-paper-dates';
import getStyles from './styles';
import { useEventContext } from '../../store/EventContext';

let EVENT = {
  id: '',
  name: '',
  address: '',
  date: '',
  guests: [],
};

const AddEventModal = () => {
  const styles = getStyles();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(undefined);
  const [event, setEvent] = useState(EVENT);
  const [error, setError] = useState(false);
  // Create refs for the inputs
  const dateInputRef = useRef(null);
  const addressInputRef = useRef(null);

  const { events, mode, editIndex, addEvent, showModal, closeDialog, updateEvent } =
    useEventContext();

  useEffect(() => {
    if (mode === 'edit') {
      const selectedEvent = events.find((eve) => eve.id === editIndex);
      setEvent(selectedEvent);
      setDate(new Date(event.date));
    }
  }, [mode]);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleChance = (id, e) => {
    if (e && e !== '') {
      setEvent(() => ({ ...event, [id]: e }));
    }
  };

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );

  const handleSelectDate = () => {
    setOpen((state) => !state);
  };

  const validateInput = useCallback(() => {
    const errors = {};
    if (!event.name.trim()) {
      errors.name = 'Event name is required';
    }
    if (!event.address.trim() || event.address.length < 8) {
      errors.address = 'Please enter a valid address';
    }
    if (!date) {
      errors.date = 'Please select a date';
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  }, [event, date]);

  const handleAddEvent = useCallback(() => {
    const isValid = validateInput();
    if (isValid) {
      addEvent({ ...event, date: date.toDateString() });
      closeDialog();
    }
  }, [event, date, validateInput]);

  const handleCloseDialog = useCallback(() => {
    EVENT = { id: '', name: '', address: '', date: '' };
    setEvent(EVENT);
    closeDialog();
  }, [closeDialog]);

  const handleUpdateEvent = useCallback(() => {
    updateEvent(event.id, event);
    closeDialog();
  }, [event, updateEvent]);

  return (
    <Portal>
      <Dialog visible={showModal} onDismiss={handleCloseDialog}>
        <KeyboardAwareScrollView scrollEnabled viewIsInsideTabBar>
          <Dialog.Title>{mode === 'add' ? 'Create New Event' : 'Edit Event'}</Dialog.Title>

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
              value={date ? date.toDateString() : ''}
              onFocus={handleSelectDate}
            />
            <View>
              <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
                presentationStyle="pageSheet"
              />
              <HelperText type="error" visible={!!error.date}>
                {error.date}
              </HelperText>
            </View>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            {mode === 'add' ? (
              <Button onPress={handleAddEvent}>Ok</Button>
            ) : (
              <Button onPress={handleUpdateEvent}>Update</Button>
            )}
          </Dialog.Actions>
        </KeyboardAwareScrollView>
      </Dialog>
    </Portal>
  );
};

export default AddEventModal;
