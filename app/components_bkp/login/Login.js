/* eslint-disable no-console */
import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import getStyles from './style';
import fb from '../../assets/images/fb.png';
import google from '../../assets/images/google.png';

const LoginForm = () => {
  const styles = getStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    console.log('Emails:', email);
    console.log('Password:', password);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new account</Text>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="envelope" size={20} color="#999" style={styles.icon} />
        <TextInput
          label="Email or phone number"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={20} color="#999" style={styles.icon} />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Image source={google} style={styles.icon} resizeMode="cover" />
          <Text>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Image source={fb} style={styles.icon} resizeMode="cover" />
          <Text style={styles.facebookLoginText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signUpContainer} onPress={handleLogin}>
        <Text style={styles.signUpText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>
          Already have an account?
          <Link href="/" asChild>
            <Text>Log in</Text>
          </Link>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
