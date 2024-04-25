import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const Help = () => (
  <WebView style={styles.container} source={{ uri: 'https://topmate.io/vitabletech' }} />
);

export default Help;
