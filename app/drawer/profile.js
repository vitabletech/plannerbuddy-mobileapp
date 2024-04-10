import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import commonStyles from '../styles/common.style';

const profile = () => {
  const classes = commonStyles();
  return (
    <View style={classes.flex1}>
      <Text style={classes.title}>Profile</Text>
    </View>
  );
};

export default profile;
