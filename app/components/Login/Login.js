import React, { useState, useRef, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme, Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { useAuth } from '../../store/AuthContext';
import getStyles from './styles';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import VTAlert from '../VTAlert/VTAlert';

const Login = () => {
  const theme = useTheme();
  const styles = getStyles();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const emailInput = useInput('atuny0', (value) => (value.trim() ? null : 'Username is required'));
  const passwordInput = useInput('9uQFF1Lh', (value) =>
    value.trim() ? null : 'Password is required',
  );

  const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();
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
    const result = await onLogin(emailInput.value, passwordInput.value);
    if (result?.error) {
      setVisible(true);
      setMessage(result?.msg);
      passwordInput.reset('');
    }
    setLoading(false);
    return true;
  };

  // Memoized components
  const AlertComponent = useMemo(
    () => <VTAlert isVisible={visible} body={message} />,
    [visible, message],
  );

  return (
    <>
      <View style={styles.textContainer}>
        <Text style={styles.textAlignCenter} variant="displaySmall">
          Welcome Back!
        </Text>
        <Text style={styles.textAlignCenter} variant="bodySmall">
          Please enter your account here
        </Text>
      </View>
      {AlertComponent}
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
    </>
  );
};

export default Login;
