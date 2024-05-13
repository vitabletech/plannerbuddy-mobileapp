import React from 'react';
import { WebView } from 'react-native-webview';
import commonStyles from './styles/common.style';

const Help = () => {
  const style = commonStyles();
  return <WebView style={style.flex1} source={{ uri: 'https://topmate.io/vitabletech' }} />;
};

export default Help;
