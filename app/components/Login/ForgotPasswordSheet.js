/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useTheme, Text, TextInput } from 'react-native-paper';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import getStyles from './styles';
import commonStyles from '../../styles/common.style';
import OTPInput from './OTPInput';
import { validateEmail, validatePassword } from '../../utils/validations';
import { forgetPassword, verifyOTP } from '../../utils/apiCalls';
import { Loader } from '../../utils/utils';
import { DEFAULT_HIT_SLOP } from '../../constants/constants';

const ForgotPasswordSheet = ({ refRBSheet }) => {
  const theme = useTheme();
  const styles = { ...getStyles(), ...commonStyles() };
  const emailForgetInput = useInput('', validateEmail);
  const newPasswordInput = useInput('', validatePassword);
  const [otpSent, setOtpSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [otpError, setOtpError] = useState('');

  const handleSubmit = () => {
    setLoader(true);
    if (!otpSent) {
      emailForgetInput.onBlur();
      newPasswordInput.onBlur();
      if (emailForgetInput.value === '' || newPasswordInput.value === '') {
        setLoader(false);
        return false;
      }
      forgetPassword({ email: emailForgetInput.value }).then((response) => {
        if (!response?.response?.data?.error) {
          setOtpSent(!otpSent);
          setOtpError(response?.data?.message);
          return;
        }
        Alert.alert(response?.response?.data?.error);
      });
    } else {
      if (otp.some((value) => value === '')) {
        setOtpError('Please fill all the OTP fields.');
        return false;
      }
      setLoader(true);
      const otpValue = otp.join('');
      verifyOTP({
        email: emailForgetInput.value,
        otp: otpValue,
        password: newPasswordInput.value,
      }).then((response) => {
        if (!response?.response?.data?.error) {
          setLoader(false);
          Alert.alert('Success', response?.data?.message);
          refRBSheet.current.close();
          return;
        }
        setLoader(false);
        Alert.alert(response?.response?.data?.error);
      });
    }
    setLoader(false);
    return false;
  };

  return (
    <View style={styles.containerStyle}>
      <Text variant="titleLarge" style={styles.title}>
        {otpSent ? 'Enter OTP' : 'We will help you find your account'}
      </Text>
      <View style={styles.gapStyle}>
        {!otpSent && (
          <>
            <VTTextInput
              label="Enter Your Email"
              {...emailForgetInput}
              left={<TextInput.Icon icon="account" />}
            />
            <VTTextInput
              label="Enter Your New Password"
              secureTextEntry
              {...newPasswordInput}
              left={<TextInput.Icon icon="eye-off" />}
            />
          </>
        )}
        {otpSent && <OTPInput otpError={otpError} otp={otp} setOtp={setOtp} />}
        {loader && Loader()}
        {!loader && (
          <TouchableOpacity
            hitSlop={DEFAULT_HIT_SLOP}
            onPress={() => handleSubmit()}
            style={styles.signUpButton}
          >
            <Text style={[styles.title, { color: theme.colors.onTertiaryContainer }]}>
              {otpSent ? 'Verify OTP' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ForgotPasswordSheet;
