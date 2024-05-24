import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import getStyles from './styles';
import commonStyles from '../../styles/common.style';

const OTPInput = ({ otp, setOtp, otpError }) => {
  const styles = { ...getStyles(), ...commonStyles() };
  const refs = useRef(otp.map(() => React.createRef()));

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, nativeEvent) => {
    if (
      (nativeEvent.key === 'Backspace' || nativeEvent.key === 'Delete') &&
      index > 0 &&
      otp[index] === ''
    ) {
      refs.current[index - 1].focus();
    }
  };

  return (
    <>
      <View style={styles.rowSpaceBetween}>
        {otp.map((value, index) => (
          <TextInput
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            ref={(ref) => {
              refs.current[index] = ref;
            }}
            value={value}
            onChangeText={(text) => handleChange(index, text)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent)}
            keyboardType="numeric"
            maxLength={1}
            style={styles.title}
          />
        ))}
      </View>
      {otpError && (
        <HelperText type="error" visible={otpError}>
          {otpError}
        </HelperText>
      )}
    </>
  );
};

OTPInput.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  otp: PropTypes.array.isRequired,
  setOtp: PropTypes.func.isRequired,
  otpError: PropTypes.string.isRequired,
};
export default OTPInput;
