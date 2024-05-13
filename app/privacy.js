import React from 'react';
import { WebView } from 'react-native-webview';
import commonStyles from './styles/common.style';

const Privacy = () => {
  const styles = commonStyles();
  return <WebView style={styles.flex1} source={{ uri: 'https://vitabletech.in/privacy_policy' }} />;
};

export default Privacy;
