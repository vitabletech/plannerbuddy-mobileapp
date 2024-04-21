import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  useTheme,
  Text,
  TextInput,
  ActivityIndicator,
  Checkbox,
} from 'react-native-paper';
import React, { useState } from 'react';

import { Link } from 'expo-router';
import { useAuth } from '../../store/AuthContext';
import getStyles from './styles';

const Login = () => {
  const theme = useTheme();
  const styles = getStyles();

  const [username, setUsername] = useState(''); // atuny0
  const [password, setPassword] = useState(''); // 9uQFF1Lh
  const [loading, setLoading] = useState(false);

  const { onLogin } = useAuth();

  const login = async () => {
    setLoading(true);
    if (!username || !password) {
      alert('Field is required');
      setLoading(false);
      return false;
    }
    const result = await onLogin(username, password);
    if (result && result.error) {
      alert(result.msg);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeaderText}>Welcome Back!</Text>
      <TextInput
        autoCapitalize="none"
        label="Enter you Username"
        value={username}
        onChangeText={setUsername}
        left={<TextInput.Icon icon="account" />}
      />
      <View style={{ marginVertical: 10 }} />
      <TextInput
        label="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        left={<TextInput.Icon icon="eye" />}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Checkbox.Item
          labelVariant="headlineMedium"
          label="Remember me"
          status="checked"
          style={{ flexDirection: 'row-reverse' }}
        />
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={login} style={styles.outlineButton}>
        <Text style={{ color: theme.colors.onPrimary }}>Log in</Text>
      </TouchableOpacity>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          flexDirection: 'row',
        }}
      >
        <Text>Don’t have any account? </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={{ color: theme.colors.primary }}>Signup</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Link href="/privacy" asChild>
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }}>
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
      </Link>
      {loading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: theme.colors.primary, zIndex: 1, justifyContent: 'center' },
          ]}
        >
          <ActivityIndicator color="#fff" size="large" />
        </View>
      )}
    </View>
  );
};

export default Login;
