import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Dialog, Portal, Text, Button, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DatePickerModal } from 'react-native-paper-dates';

const AddEventModal = ({ visible, setShowModal }) => {
  const [date, setDate] = useState(undefined);
  console.log(date);
  const [open, setOpen] = useState(false);
  const hideDialog = () => setShowModal((state) => !state);

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

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <KeyboardAwareScrollView scrollEnabled viewIsInsideTabBar>
          <Dialog.Title>Create new Event</Dialog.Title>

          <Dialog.Content>
            <TextInput mode="outlined" label="Event Name" />

            <TextInput mode="outlined" label="Address" />
            <Button onPress={() => setOpen((state) => !state)}>Select Date</Button>
            {date && <Text variant="displaySmall">{date.toDateString()}</Text>}
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
            <Button onPress={() => console.log('Cancel')}>Cancel</Button>
            <Button onPress={() => console.log('Ok')}>Ok</Button>
          </Dialog.Actions>
        </KeyboardAwareScrollView>
      </Dialog>
    </Portal>
  );
};

AddEventModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
export default AddEventModal;
