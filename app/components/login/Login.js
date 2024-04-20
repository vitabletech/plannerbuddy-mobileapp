import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Text, TextInput, ActivityIndicator } from 'react-native-paper';
import React, { useState } from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useAuth } from '../../store/AuthContext';
import getStyles from './styles';
import commonStyles from '../../styles/common.style';
import { useGlobal } from '../../store/globalContext';

const Login = () => {
  const theme = useTheme();
  const styles = getStyles();
  const commonstyles = commonStyles();

  const [username, setUsername] = useState('atuny0'); // atuny0
  const [password, setPassword] = useState('9uQFF1Lh'); // 9uQFF1Lh
  const [loading, setLoading] = useState(false);

  const { onLogin } = useAuth();
  const { onChange } = useGlobal();

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

  function handleSignup() {
    onChange('signup');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeaderText}>Welcome Back!</Text>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={20} color="#999" style={styles.icon} />

        <TextInput
          autoCapitalize="none"
          label="Enter you Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </View>

      {/* <View style={{ height: 10 }} /> */}
      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={20} color="#999" style={styles.icon} />

        <TextInput
          label="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={{ color: theme.colors.primary }}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.outlineButton} onPress={handleSignup}>
          <Text style={{ color: theme.colors.background }}>Create Account</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/privacy" asChild>
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: theme.colors.background }}>Privacy Policy</Text>
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
