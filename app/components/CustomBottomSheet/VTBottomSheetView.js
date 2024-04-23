import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import getStyles from './style';

const VTBottomSheetView = ({ content }) => {
  const styles = getStyles();
  return (
    <GestureHandlerRootView style={styles.content}>
      <View style={styles.container}>
        <BottomSheet snapPoints={['100%']}>
          <BottomSheetView style={styles.contentContainer}>{content}</BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

VTBottomSheetView.propTypes = {
  content: PropTypes.node.isRequired,
};

export default VTBottomSheetView;
