import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import GuestLists from '../GuestLists/GuestLists';
import getStyles from './styles';

const GuestsPage = () => {
  const styles = getStyles();
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <View style={styles.columnFlexOne}>
      <GuestLists />
      <Button
        style={styles.absolutePositionBottomRight}
        icon="calendar-plus"
        mode="elevated"
        onPress={openDialog}
      >
        Create Event
      </Button>
    </View>
  );
};

export default GuestsPage;
