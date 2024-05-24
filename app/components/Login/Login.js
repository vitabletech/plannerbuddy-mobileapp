import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useTheme, Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { onLogin } from '../../store/reducers/authSlice';
import getStyles from './styles';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import commonStyles from '../../styles/common.style';
import { validateEmail, validatePassword } from '../../utils/validations';

const Login = () => {
  const theme = useTheme();
  const styles = { ...getStyles(), ...commonStyles() };
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const emailInput = useInput('', validateEmail);
  const emailForgetInput = useInput('', validateEmail);
  const passwordInput = useInput('', validatePassword);

  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef(null);
  const login = async () => {
    setLoading(true);
    // Trigger validation for all input fields
    emailInput.onBlur();
    passwordInput.onBlur();
    if (!emailInput.value || !passwordInput.value) {
      setLoading(false);
      return false;
    }
    await dispatch(onLogin({ email: emailInput.value, password: passwordInput.value }));
    if (error) {
      Alert.alert('Error', error);
    }
    setLoading(false);
    return true;
  };

  const handleCloseForgetPassword = () => refRBSheet.current.close();

  return (
    <>
      <RBSheet
        ref={refRBSheet}
        height={400}
        customStyles={{
          container: {
            backgroundColor: theme.colors.surface,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
        closeOnPressBack
        draggable
      >
        <View style={styles.containerStyle}>
          <Text
            variant="titleLarge"
            style={[styles.title, { color: theme.colors.onTertiaryContainer }]}
          >
            We will help you find your account
          </Text>
          <View style={styles.gapStyle}>
            <VTTextInput
              label="Enter Your Email"
              {...emailForgetInput}
              left={<TextInput.Icon icon="account" />}
            />
            <Text
              variant="labelLarge"
              style={[styles.title, { color: theme.colors.onTertiaryContainer }]}
            >
              OTP will be sent through mail
            </Text>
            <TouchableOpacity
              onPress={handleCloseForgetPassword}
              style={styles.forgetPasswordButton}
            >
              <Text style={[styles.title, { color: theme.colors.onTertiaryContainer }]}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
      <View style={styles.textContainer}>
        <Text style={styles.textAlignCenter} variant="displaySmall">
          Welcome
        </Text>
        <Text style={styles.textAlignCenter} variant="bodySmall">
          Please enter your login details to continue
        </Text>
      </View>
      <View>
        <VTTextInput
          label="Enter Your Email"
          {...emailInput}
          left={<TextInput.Icon icon="account" />}
          onSubmitEditing={() => passwordInputRef.current.focus()}
        />
        <VTTextInput
          label="Enter Password"
          ref={passwordInputRef}
          secureTextEntry={!isPasswordVisible}
          left={
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
              onPress={() => setIsPasswordVisible((state) => !state)}
            />
          }
          {...passwordInput}
        />
        {loading ? (
          <ActivityIndicator style={styles.outlineButton} color={theme.colors.onPrimary} />
        ) : (
          <TouchableOpacity onPress={login} style={styles.outlineButton}>
            <Text style={{ color: theme.colors.white }}>Log in</Text>
          </TouchableOpacity>
        )}
        <View style={styles.positionCenter}>
          <Text>Don’t have any account? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.signUpForget}>Signup</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.positionCenter}>
          <Button onPress={() => refRBSheet.current.open()}>
            <Text style={styles.signUpForget}>Forgot password ?</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default Login;
