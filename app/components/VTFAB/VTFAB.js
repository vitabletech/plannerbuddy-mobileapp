/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal, useTheme } from 'react-native-paper';
import { SETTING_ACTIONS } from '../../utils/utils';
import commonStyles from '../../styles/common.style';

const VTFAB = ({ children, actionsButton = [], iconOpen = 'plus', iconClose = 'close' }) => {
  const theme = useTheme();
  const styles = { ...commonStyles() };
  const navigation = useNavigation();
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const defaultOptions = [...SETTING_ACTIONS(navigation)];
  let actions = actionsButton.length ? actionsButton : defaultOptions;
  actions = actions.map((item) => ({ ...item, color: theme.colors.onSurface }));

  return (
    <Portal.Host>
      {children}
      <FAB.Group
        open={open}
        visible
        icon={open ? iconClose : iconOpen}
        actions={actions}
        onStateChange={onStateChange}
        fabStyle={styles.FAB}
        color={theme.colors.onSurface}
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
