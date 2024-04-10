import React from 'react';
import { View } from 'react-native';
import { Card, Surface } from 'react-native-paper';
import RenderAvatar from '../RenderAvatar';
import CardComponent from './CardComponent';
import getStyles from './style';

const HomeScreen = () => {
  const styles = getStyles();
  const dashboardDataCount = [
    { title: 'Total event', value: 5 },
    { title: 'Received Invitation', value: 5 },
    { title: 'Total Gifts', value: 5 },
    { title: 'Total Event Group', value: 54 },
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
        <Surface style={styles.surface}>
          <View style={styles.totalDiv}>
            <View style={styles.flexRow}>
              {dashboardDataCount.map((data) => (
                <View key={data.title} style={styles.flexBasis50}>
                  <CardComponent title={data.title} count={data.value} />
                </View>
              ))}
            </View>
          </View>
        </Surface>
      </View>
    </View>
  );
};

export default HomeScreen;
