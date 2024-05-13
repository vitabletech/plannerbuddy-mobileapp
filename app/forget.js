import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const Privacy = () => (
  <WebView style={styles.container} source={{ uri: 'https://vitabletech.in/privacy_policy' }} />
);

export default Privacy;
