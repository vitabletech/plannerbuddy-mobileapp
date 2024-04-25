import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Image } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import { useAuth } from '../../store/AuthContext';
import { IconComponent, onShare } from '../../utils/utils';
import { DEFAULT_DRAWER_ICON_SIZE } from '../../constants/constants';
import getStyles from './styles';
import commonStyles from '../../styles/common.style';
import bigLogo from '../../assets/bigLogo.png';

const CustomDrawerContent = (props) => {
  const { colors } = useTheme();
  const { onLogout } = useAuth();
  const styles = { ...getStyles(), ...commonStyles() };

  const renderDrawerItem = ({ iconName, iconType, onPress, label = '' }) => (
    <DrawerItem
      label={label}
      icon={() => IconComponent(iconType, iconName, DEFAULT_DRAWER_ICON_SIZE, colors.background)}
      onPress={onPress}
    />
  );

  return (
    <>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Image source={bigLogo} resizeMode="contain" style={{ width: '100%' }} />
        </View>
        <Divider />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={[styles.footerText, styles.flexRow]}>
        <View style={styles.flex1}>
          {renderDrawerItem({ iconName: 'share', iconType: 'Entypo', onPress: onShare })}
        </View>
        <View style={styles.flex1}>
          {renderDrawerItem({
            iconName: 'log-out-outline',
            iconType: 'Ionicons',
            onPress: onLogout,
          })}
        </View>
      </View>
    </>
  );
};

export default CustomDrawerContent;
