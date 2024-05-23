import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import getStyles from './style';
import image from '../../assets/Logo.png';

const VTBottomSheet = ({ content }) => {
  const styles = getStyles();
  return (
    <GestureHandlerRootView style={styles.content}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} resizeMode="contain" />
        <BottomSheet
          snapPoints={['70%']}
          handleComponent={null}
          backgroundStyle={styles.bottomSheet}
        >
          <BottomSheetScrollView style={styles.contentContainer}>{content}</BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

VTBottomSheet.propTypes = {
  content: PropTypes.node.isRequired,
};

export default VTBottomSheet;
