import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Dialog, Portal, Button, TextInput, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DatePickerModal } from 'react-native-paper-dates';
import getStyles from './styles';
import { useEventContext } from '../../store/EventContext';
import { fetchEventDetails } from '../../utils/utils';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';

const AddEventModal = () => {
  const styles = getStyles();
  let EVENT = fetchEventDetails();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [event, setEvent] = useState(EVENT);
  const [error, setError] = useState(false);
  // Create refs for the inputs
  const dateInputRef = useRef(null);
  const addressInputRef = useRef(null);

  const { events, mode, editIndex, addEvent, showModal, closeDialog, updateEvent } =
    useEventContext();

  const nameInput = useInput('', (value) => (value.trim() ? null : 'Event is required'));
  const addressInput = useInput('', (value) => (value.trim() ? null : 'Event is required'));

  useEffect(() => {
    if (mode === 'edit') {
      const selectedEvent = events.find((eve) => eve.id === editIndex);
      setEvent(selectedEvent);
      setSelectedDate(new Date(selectedEvent.date));
    }
  }, [mode]);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
    if (!event.address.trim() || event.address.length < 8) {
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
      addEvent({ ...event });
      closeDialog();
    }
  }, [event, selectedDate, validateInput]);

  const handleCloseDialog = useCallback(() => {
    EVENT = { id: '', name: '', address: '', date: '' };
    setEvent(EVENT);
    closeDialog();
  }, [closeDialog]);

  const handleUpdateEvent = useCallback(() => {
    updateEvent(event.id, { event: { ...event } });
    closeDialog();
  }, [event, updateEvent]);

  return (
    <Portal>
      <Dialog visible={showModal} onDismiss={handleCloseDialog}>
        <KeyboardAwareScrollView scrollEnabled viewIsInsideTabBar>
          <Dialog.Title>{mode === 'edit' ? 'Edit Event' : 'Create New Event'}</Dialog.Title>
          <Dialog.Content style={styles.contentContainer}>
            <VTTextInput
              label="Event name"
              {...nameInput}
              onSubmitEditing={() => addressInputRef.current.focus()}
            />
            <VTTextInput
              ref={addressInputRef}
              label="Address"
              {...addressInput}
              onSubmitEditing={() => dateInputRef.current.focus()}
            />
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
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            {mode === 'edit' ? (
              <Button onPress={handleUpdateEvent}>Update</Button>
            ) : (
              <Button onPress={handleAddEvent}>Ok</Button>
            )}
          </Dialog.Actions>
        </KeyboardAwareScrollView>
      </Dialog>
    </Portal>
  );
};

export default AddEventModal;
