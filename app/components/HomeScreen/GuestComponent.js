import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Avatar, Surface, useTheme } from 'react-native-paper';
import getStyles from './style';
import commonStyles from '../../styles/common.style';
import { fetchGuest } from '../../store/GuestContext';
import { Loader } from '../../utils/utils';

const GuestComponent = () => {
  const styles = { ...getStyles(), ...commonStyles() };
  const theme = useTheme();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.guest.status);
  const totalPages = useSelector((state) => state.guest.totalPages);
  const pages = useSelector((state) => state.guest.page);
  const totalData = useSelector((state) => state.guest.totalData);
  const [totalGuest, setTotalGuest] = useState(totalData);

  useEffect(() => {
    setTotalGuest(totalData);
  }, [totalData]);
  useEffect(() => {
    dispatch(fetchGuest(pages));
  }, [pages, totalPages]);

  return (
    <View style={styles.guestContainer}>
      <Surface style={[styles.totalGuest, { backgroundColor: theme.colors.onSurfaceVariant }]}>
        <View style={styles.flexRow}>
          <View style={styles.flex1}>
            <View style={styles.flexRow}>
              <Avatar.Icon
                size={26}
                icon="contacts"
                color={theme.colors.primary}
                style={{ backgroundColor: theme.colors.background }}
              />
              <Text style={styles.guestLabel} variant="titleLarge">
                {status === 'loading' ? Loader() : totalGuest}
              </Text>
              <Text
                style={[styles.guestLabel, styles.position_relative, styles.guestAddMore]}
                variant="titleSmall"
              >
                Guest
              </Text>
            </View>
            <Text style={styles.textWhite} variant="titleSmall">
              Total Guest List
            </Text>
          </View>
          <View style={[styles.flex1, styles.flexEnd, styles.jstCenter]}>
            <Link href="./../Screens/ViewGuests" replace>
              <Text
                style={[
                  styles.position_absolute,
                  styles.textDecorationLine,
                  { color: theme.colors.background },
                ]}
                variant="titleMedium"
              >
                Add More
              </Text>
            </Link>
          </View>
        </View>
      </Surface>
    </View>
  );
};

export default GuestComponent;
