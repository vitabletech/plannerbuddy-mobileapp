import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CustomWebView = ({ uri }) => <WebView style={styles.container} source={{ uri }} />;
CustomWebView.propTypes = {
  uri: PropTypes.string.isRequired,
};
export default CustomWebView;
