import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import commonStyles from '../../styles/common.style';

import getStyles from './styles';

const CreativeDashBoard = () => {
  const styles = { ...getStyles(), ...commonStyles() };
  return (
    <View style={[styles.flex1, styles.centerContent]}>
      <Text variant="displaySmall"> Coming Soon</Text>
    </View>
  );
};

export default CreativeDashBoard;
