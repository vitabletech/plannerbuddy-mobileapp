import React from 'react';
import { Portal } from 'react-native-paper';
import { useSelector } from 'react-redux';
import InputDialog from '../InputDialog/InputDialog';
import AddGifts from './AddGifts';

const AddGiftModal = () => {
  const showModal = useSelector((state) => state.gift.showModal);
  const handleCloseDialog = () => {};
  return (
    <Portal>
      <InputDialog visible={showModal} onDismiss={handleCloseDialog}>
        <AddGifts />
      </InputDialog>
    </Portal>
  );
};

export default AddGiftModal;
