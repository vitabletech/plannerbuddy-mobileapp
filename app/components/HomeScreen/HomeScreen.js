import React from 'react';
import { View } from 'react-native';
import { Card, Surface, Text, Avatar } from 'react-native-paper';
import RenderAvatar from '../RenderAvatar';
import getStyles from './style';

const HomeScreen = () => {
  const styles = getStyles();
  const dashboardDataCount = [
    { title: 'Event' },
    { title: 'Invitation' },
    { title: 'Gifts' },
    { title: 'Creative' },
  ];
  const avatar = () => <RenderAvatar />;
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Card.Title
          title="Welcome Mayank"
          titleStyle={styles.titleStyle}
          right={() => avatar()}
          rightStyle={styles.rightStyle}
        />
      </View>
      <View style={styles.dashboard}>
        <Surface elevation={4} style={styles.surfaceContainer}>
          <View style={styles.flexRow}>
            {dashboardDataCount.map((data) => (
              <View key={data.title} style={[styles.flexBasis25, styles.positionCenter]}>
                <Avatar.Icon size={24} icon="folder" />
                <Text style={styles.name}>{data.title}</Text>
              </View>
            ))}
          </View>
        </Surface>
      </View>
    </View>
  );
};

export default HomeScreen;
