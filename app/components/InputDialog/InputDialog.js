import React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const InputDialog = ({ visible, onDismiss, children }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} dismissable={false}>
        <KeyboardAwareScrollView enableAutomaticScroll scrollEnabled viewIsInsideTabBar>
          {children}
        </KeyboardAwareScrollView>
      </Dialog>
    </Portal>
  );
};

InputDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputDialog;
