import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Dialog, Portal, Button, TextInput } from 'react-native-paper';
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

  const handleChance = (id, e) => {
    if (e && e !== '') {
      setEvent((event) => ({ ...event, [id]: e }));
    }
  };

  const handleAddEvent = () => {
    addEvent({ ...event, date: date.toDateString() });
    closeDialog();
  };

  const handleCloseDialog = () => {
    EVENT = { id: '', name: '', address: '', date: '' };
    closeDialog();
  };

  const handleUpdateEvent = () => {
    updateEvent(event.id, event);
    closeDialog();
  };

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
            />

            <TextInput
              style={styles.input}
              mode="outlined"
              value={event.address}
              label="Address"
              onChangeText={(e) => handleChance('address', e)}
            />
            <TextInput
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
