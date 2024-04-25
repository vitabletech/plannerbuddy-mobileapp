import React from 'react';
import { View } from 'react-native';
import { Text, Avatar, Surface } from 'react-native-paper';
import { dashboardDataCount } from './utils';
import getStyles from './style';

const DashboardItem = () => {
  const styles = getStyles();
  return (
    <View style={styles.dashboard}>
      <Surface elevation={4} style={styles.surfaceContainer}>
        <View style={styles.flexRow}>
          {dashboardDataCount.map((data) => (
            <View key={data.title} style={[styles.flexBasis25, styles.positionCenter]}>
              <Avatar.Icon size={30} icon={data.icon} />
              <Text style={styles.name}>{data.title}</Text>
            </View>
          ))}
        </View>
      </Surface>
    </View>
  );
};

export default DashboardItem;
