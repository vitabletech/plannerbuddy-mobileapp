import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { onLogout } from '../../store/reducers/authSlice';
import { SETTING_ACTIONS } from '../../utils/utils';

const VTFAB = ({ children, actionsButton = [] }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const defaultOptions = [
    { icon: 'logout', label: 'Logout', onPress: () => dispatch(onLogout()) },
    ...SETTING_ACTIONS(navigation),
  ];

  const actions = actionsButton.length ? actionsButton : defaultOptions;

  return (
    <Portal.Host>
      {children}
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={actions}
        onStateChange={onStateChange}
      />
    </Portal.Host>
  );
};

VTFAB.propTypes = {
  children: PropTypes.node.isRequired,
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
