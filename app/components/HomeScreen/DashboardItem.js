import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Avatar, Surface } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { dashboardDataCount } from './utils';
import getStyles from './style';

const DashboardItem = () => {
  const styles = getStyles();
  const router = useRouter();
  return (
    <View style={styles.dashboard}>
      <Surface elevation={4} style={styles.surfaceContainer}>
        <View style={styles.flexRow}>
          {dashboardDataCount.map((data) => (
            <TouchableOpacity
              key={`${data.title} ${data.icon}`}
              onPress={() => (data.replace ? router.replace(data?.href) : router.push(data?.href))}
            >
              <View key={data.title} style={[styles.flexBasis25, styles.positionCenter]}>
                <Avatar.Icon size={30} icon={data.icon} />
                <Text style={styles.name}>{data.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Surface>
    </View>
  );
};

export default DashboardItem;
