import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

const ConfirmDialog = ({ visible, onDelete, setVisible }) => {
  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>
        <Dialog.Title>Delete</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Are you sure you want to delete this item?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancel</Button>
          <Button onPress={onDelete}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

ConfirmDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default ConfirmDialog;
