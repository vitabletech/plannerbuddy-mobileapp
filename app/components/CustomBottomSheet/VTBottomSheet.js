import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import getStyles from './style';
import image from '../../assets/Logo.png';

const VTBottomSheet = ({ content }) => {
  const styles = getStyles();
  const refRBSheet = useRef();
  useEffect(() => {
    refRBSheet.current.open();
  }, []);

  const screenHeight = Dimensions.get('window').height;
  const sheetHeight = screenHeight * 0.7; // 70% of screen height

  return (
    <GestureHandlerRootView style={styles.content}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} resizeMode="contain" />
        <RBSheet
          ref={refRBSheet}
          height={sheetHeight}
          customStyles={{
            wrapper: { backgroundColor: 'transparent' },
            container: styles.bottomSheet,
          }}
          closeOnDragDown={false}
          closeOnPressMask={false}
        >
          <View style={styles.contentContainer}>{content}</View>
        </RBSheet>
      </View>
    </GestureHandlerRootView>
  );
};

VTBottomSheet.propTypes = {
  content: PropTypes.node.isRequired,
};

export default VTBottomSheet;
