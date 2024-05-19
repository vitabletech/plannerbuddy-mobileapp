/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import commonStyles from '../../styles/common.style';

const VTAlert = ({ title = '', body = 'Default Message', icon = 'alert-circle', isVisible }) => {
  const [visible, setVisible] = useState(isVisible);
  const styles = commonStyles();
  const hideDialog = () => setVisible(false);
  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        {icon && <Dialog.Icon icon={icon} />}
        {title && (
          <Dialog.Title style={styles.title}>
            <Text>{title}</Text>
          </Dialog.Title>
        )}
        <Dialog.Content style={styles.title}>
          <Text variant="bodyMedium">{body}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible((state) => !state)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

VTAlert.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  icon: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
};
export default VTAlert;
