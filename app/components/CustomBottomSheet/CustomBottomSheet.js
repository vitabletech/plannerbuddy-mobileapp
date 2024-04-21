import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Dimensions, Image } from 'react-native';
import getStyles from './style';
import image from '../../assets/Logo.png';

const CustomBottomSheet = ({ content }) => {
  const styles = getStyles();
  const screenHeight = Dimensions.get('window').height;
  return (
    <Modal transparent>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>
        <View style={[styles.bottomSheet, { height: screenHeight * 0.75 }]} testID="bottomSheet">
          {/* Content of the bottom sheet */}
          <View style={styles.content}>{content}</View>
        </View>
      </View>
    </Modal>
  );
};

CustomBottomSheet.propTypes = {
  content: PropTypes.node.isRequired,
};

export default CustomBottomSheet;
