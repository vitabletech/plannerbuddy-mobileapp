import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal } from 'react-native-paper';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { onLogout } from '../../store/reducers/authSlice'; // Import logout action from Redux slice
import { SETTING_ACTIONS } from '../../utils/utils';

const VTFAB = ({ children, actionsButton }) => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
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

VTFAB.defaultProps = {
  actionsButton: [],
};

VTFAB.propTypes = {
  children: PropTypes.node.isRequired,
  actionsButton: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string,
      onPress: PropTypes.func.isRequired,
    }),
  ),
};

export default VTFAB;
