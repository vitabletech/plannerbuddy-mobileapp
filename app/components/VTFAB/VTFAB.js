import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal } from 'react-native-paper';
import { SETTING_ACTIONS } from '../../utils/utils';
import { useAuth } from '../../store/AuthContext';

const VTFAB = ({ actionsButton }) => {
  const { onLogout } = useAuth();
  const navigation = useNavigation();
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const actions = actionsButton.length ? actionsButton : SETTING_ACTIONS(navigation);

  return (
    <Portal>
      <FAB.Group
        style={{ marginBottom: 50 }}
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'logout',
            label: 'Logout',
            onPress: () => onLogout(),
          },
          ...actions,
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};
VTFAB.defaultProps = {
  actionsButton: [],
};

VTFAB.propTypes = {
  // children: PropTypes.node.isRequired,
  actionsButton: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string,
      onPress: PropTypes.func.isRequired,
    }),
  ),
};

export default VTFAB;
