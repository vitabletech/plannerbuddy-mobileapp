import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Avatar, Surface, useTheme } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import getStyles from './style';
import commonStyles from '../../styles/common.style';
import { fetchGuest } from '../../store/GuestContext';
import { Loader } from '../../utils/utils';
import GuestIcons from '../../assets/guests.png';

const GuestComponent = () => {
  const styles = { ...getStyles(), ...commonStyles() };
  const theme = useTheme();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.guest.status);
  const totalPages = useSelector((state) => state.guest.totalPages);
  const page = useSelector((state) => state.guest.page);
  const totalData = useSelector((state) => state.guest.totalData);
  const [totalGuest, setTotalGuest] = useState(totalData);
  const searchGuests = useSelector((state) => state.guest.searchGuests);

  useEffect(() => {
    if (!searchGuests) setTotalGuest(totalData);
  }, [totalData, searchGuests]);
  useEffect(() => {
    if (!searchGuests) dispatch(fetchGuest({ page }));
  }, [page, totalPages, searchGuests]);

  return (
    <View style={styles.guestContainer}>
      <Surface style={[styles.totalGuest, { backgroundColor: theme.colors.chocolate }]}>
        <Image source={GuestIcons} style={styles.imageGuest} />
        <View style={styles.flexRow}>
          <View style={styles.flex1}>
            <View style={styles.flexRow}>
              <Avatar.Icon
                size={26}
                icon="contacts"
                color={theme.colors.primary}
                style={{ backgroundColor: theme.colors.white }}
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
            <Text style={styles.guestLabel} variant="titleSmall">
              Total Guest List
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.replace('./../Screens/ViewGuests')}
            style={styles.createButton}
          >
            <View style={[styles.borderLine, styles.borderColorWhite]}>
              <Text variant="titleMedium" style={styles.textWhite}>
                Add Guests <FontAwesome name="angle-double-right" size={18} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
};

export default GuestComponent;
