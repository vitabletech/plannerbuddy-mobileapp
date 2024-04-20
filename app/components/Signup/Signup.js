/* eslint-disable no-console */
import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import getStyles from './style';
import fb from '../../assets/images/fb.png';
import google from '../../assets/images/google.png';
import commonStyles from '../../styles/common.style';

import { useAuth } from '../../store/AuthContext';
import { useGlobal } from '../../store/globalContext';

const Signup = () => {
  const styles = getStyles();
  const commonstyles = commonStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onRegister } = useAuth();
  const { onChange } = useGlobal();
  const handleSignup = () => {
    onRegister(name, email, password);
  };

  function handleSignin() {
    onChange('login');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new account</Text>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={20} color="#999" style={styles.icon} />
        <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} />
      </View>

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

      <TouchableOpacity style={styles.signUpContainer} onPress={handleSignup}>
        <Text style={styles.signUpText}>Signup</Text>
      </TouchableOpacity>

      <View style={styles.divider}></View>

      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Image source={google} style={styles.icon} resizeMode="cover" />
          <Text style={styles.loginOptionText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Image source={fb} style={styles.icon} resizeMode="cover" />
          <Text style={styles.loginOptionText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.createAccountContainer}>
        <Text>
          Already have an account?
          <TouchableOpacity onPress={handleSignin}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </Text>
      </View>

      <Link href="/drawer" asChild>
        <TouchableOpacity style={commonstyles.skipoutlineButton}>
          <Text>Skip</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Signup;
