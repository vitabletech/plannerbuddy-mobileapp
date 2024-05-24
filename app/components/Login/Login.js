import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useTheme, Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { onLogin, authActions } from '../../store/reducers/authSlice';
import getStyles from './styles';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import commonStyles from '../../styles/common.style';
import ForgotPasswordSheet from './ForgotPasswordSheet';
import { validateEmail, validatePassword } from '../../utils/validations';
import { DEFAULT_HIT_SLOP } from '../../constants/constants';

const Login = () => {
  const theme = useTheme();
  const styles = { ...getStyles(), ...commonStyles() };
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const emailInput = useInput('', validateEmail);
  const passwordInput = useInput('', validatePassword);
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [
        { text: 'OK', onPress: () => dispatch(authActions.clearError()) },
      ]);
    }
  }, [error]);
  const login = async () => {
    setLoading(true);
    emailInput.onBlur();
    passwordInput.onBlur();
    if (!emailInput.value || !passwordInput.value) {
      setLoading(false);
      return false;
    }
    await dispatch(onLogin({ email: emailInput.value, password: passwordInput.value }));
    setLoading(false);
    return true;
  };

  return (
    <>
      <RBSheet
        ref={refRBSheet}
        height={400}
        closeOnDragDown={false}
        closeOnPressMask={false}
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
        <ForgotPasswordSheet refRBSheet={refRBSheet} />
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
          left={<TextInput.Icon icon="account" label="email" />}
          onSubmitEditing={() => passwordInputRef.current.focus()}
        />
        <VTTextInput
          label="Enter Password"
          ref={passwordInputRef}
          secureTextEntry={!isPasswordVisible}
          left={
            <TextInput.Icon
              label="password"
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
              onPress={() => setIsPasswordVisible((state) => !state)}
            />
          }
          {...passwordInput}
        />
        {loading ? (
          <ActivityIndicator style={styles.outlineButton} color={theme.colors.onPrimary} />
        ) : (
          <TouchableOpacity hitSlop={DEFAULT_HIT_SLOP} onPress={login} style={styles.outlineButton}>
            <Text style={{ color: theme.colors.white }}>Log in</Text>
          </TouchableOpacity>
        )}
        <View style={styles.positionCenter}>
          <Text>Don’t have any account? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity hitSlop={DEFAULT_HIT_SLOP}>
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
