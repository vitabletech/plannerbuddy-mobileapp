import React, { useState } from 'react';
import { Link } from 'expo-router';
import { View, TouchableOpacity, Image } from 'react-native';
import { useTheme, Text, TextInput } from 'react-native-paper';
import getStyles from './style';
import { useAuth } from '../../store/AuthContext';
import { useGlobal } from '../../store/globalContext';

const Signup = () => {
  const theme = useTheme();
  const styles = getStyles();
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onRegister } = useAuth();
  const { onChange } = useGlobal();
  const handleSignup = () => {
    onRegister(name, email, password);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new account</Text>
      <TextInput
        label="Full Nmae"
        value={name}
        onChangeText={setName}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        label="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        left={<TextInput.Icon icon="eye" />}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        left={<TextInput.Icon icon="eye-off" />}
      />
      <TouchableOpacity onPress={handleSignup} style={styles.outlineButton}>
        <Text style={{ color: theme.colors.onPrimary }}>Sign Up</Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          flexDirection: 'row',
        }}
      >
        <Text>Already have an account? </Text>
        <Link replace href="/" asChild>
          <TouchableOpacity>
            <Text style={{ color: theme.colors.primary }}>Log in</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Signup;
