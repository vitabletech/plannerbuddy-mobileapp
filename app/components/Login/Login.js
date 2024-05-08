import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme, Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { onLogin } from '../../store/reducers/authSlice';
import getStyles from './styles';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import { AlertComponent } from '../../utils/utils';

const Login = () => {
  const theme = useTheme();
  const styles = getStyles();
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const emailInput = useInput('test@user.com', (value) =>
    value.trim() ? null : 'Email is required',
  );
  const passwordInput = useInput('12345678', (value) =>
    value.trim() ? null : 'Password is required',
  );

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
    setLoading(false);
    return true;
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.textContainer}>
        <Text style={styles.textAlignCenter} variant="displaySmall">
          Welcome Back!
        </Text>
        <Text style={styles.textAlignCenter} variant="bodySmall">
          Please enter your account here
        </Text>
      </View>
      {AlertComponent(error)}
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
            <Text style={{ color: theme.colors.onPrimary }}>Log in</Text>
          </TouchableOpacity>
        )}
        <View style={styles.positionCenter}>
          <Text>Don’t have any account? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={{ color: theme.colors.primary }}>Signup</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <Link href="/forget" asChild>
          <Button>Forgot password?</Button>
        </Link>
        <Link href="/privacy" asChild>
          <TouchableOpacity style={styles.positionCenter}>
            <Text>Privacy Policy</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
