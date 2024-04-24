import React from 'react';
import { View, Image } from 'react-native';
import { Text, Avatar, Surface, useTheme } from 'react-native-paper';
import getStyles from './style';
import commonStyles from '../../styles/common.style';
import GuestBg from '../../assets/images/guestbg.png';

const GuestComponent = () => {
  const styles = getStyles();
  const classes = commonStyles();
  const theme = useTheme();
  return (
    <View style={styles.guestContainer}>
      <Surface style={[styles.totalGuest, { backgroundColor: theme.colors.onSurfaceVariant }]}>
        <View style={classes.flexRow}>
          <View style={classes.flex1}>
            <View style={classes.flexRow}>
              <Avatar.Icon
                size={26}
                icon="contacts"
                color={theme.colors.primary}
                style={{ backgroundColor: theme.colors.background }}
              />
              <Text style={styles.guestLabel} variant="titleLarge">
                1000
              </Text>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={[styles.guestLabel, classes.position_relative, { top: 10, zIndex: 1 }]}
                variant="titleSmall"
              >
                Guest
              </Text>
            </View>
            <Text style={classes.textWhite} variant="titleSmall">
              Total Guest List
            </Text>
          </View>
          <View style={[classes.flex1, classes.flexEnd, classes.jstCenter]}>
            <Image source={GuestBg} />
            <Text
              style={[
                classes.position_absolute,
                classes.textDecorationLine,
                { color: theme.colors.background },
              ]}
              variant="titleMedium"
            >
              Add More
            </Text>
          </View>
        </View>
      </Surface>
    </View>
  );
};

export default GuestComponent;
