import { View, TouchableOpacity } from 'react-native';
import {
  useTheme,
  Text,
  TextInput,
  ActivityIndicator,
  Checkbox,
  HelperText,
} from 'react-native-paper';
import React, { useState, useRef } from 'react';

import { Link } from 'expo-router';
import { useAuth } from '../../store/AuthContext';
import getStyles from './styles';

const Login = () => {
  const theme = useTheme();
  const styles = getStyles();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState(''); // atuny0
  const [password, setPassword] = useState(''); // 9uQFF1Lh
  const [loading, setLoading] = useState(false);
  const [hasError, sethasError] = useState(false);
  const { onLogin } = useAuth();
  const passwordInputRef = useRef(null);
  const login = async () => {
    setLoading(true);
    if (!username || !password) {
      sethasError(true);
      setLoading(false);
      return false;
    }
    const result = await onLogin(username, password);
    if (result?.error) {
      alert(result?.msg);
    }
    setLoading(false);
    return true;
  };

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
      <View>
        <View>
          <TextInput
            autoCapitalize="none"
            label="Enter Your Email"
            value={username}
            onChangeText={setUsername}
            onSubmitEditing={() => passwordInputRef.current.focus()}
            left={<TextInput.Icon icon="account" />}
          />
          <HelperText type="error" visible={hasError && !username}>
            <Text>Username is invalid!</Text>
          </HelperText>
        </View>
        <View>
          <TextInput
            label="Enter Password"
            ref={passwordInputRef}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            left={
              <TextInput.Icon
                icon={isPasswordVisible ? 'eye' : 'eye-off'}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
          />
          <HelperText type="error" visible={hasError && !password}>
            <Text>Password is invalid!</Text>
          </HelperText>
        </View>
        <View style={styles.rowSpaceBetween}>
          <Checkbox.Item
            labelVariant="labelLarge"
            label="Remember me"
            status="checked"
            style={styles.rowReverse}
          />
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text>Forgot password?</Text>
          </TouchableOpacity>
        </View>
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
