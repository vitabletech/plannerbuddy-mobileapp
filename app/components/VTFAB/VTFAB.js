/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal } from 'react-native-paper';
import { SETTING_ACTIONS } from '../../utils/utils';

const VTFAB = ({ children, actionsButton = [], iconOpen = 'plus', iconClose = 'close' }) => {
  const navigation = useNavigation();
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const defaultOptions = [...SETTING_ACTIONS(navigation)];

  const actions = actionsButton.length ? actionsButton : defaultOptions;

  return (
    <Portal.Host>
      {children}
      <FAB.Group
        open={open}
        visible
        icon={open ? iconClose : iconOpen}
        actions={actions}
        onStateChange={onStateChange}
      />
    </Portal.Host>
  );
};

VTFAB.propTypes = {
  children: PropTypes.node.isRequired,
  iconOpen: PropTypes.string,
  iconClose: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  actionsButton: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string,
      onPress: PropTypes.func.isRequired,
    }),
  ),
};

export default VTFAB;
