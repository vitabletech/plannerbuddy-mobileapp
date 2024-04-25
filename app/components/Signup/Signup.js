import React, { useState, useRef } from 'react';
import { Link } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';
import { useTheme, Text, TextInput, HelperText } from 'react-native-paper';
import getStyles from './styles';
import { useAuth } from '../../store/AuthContext';

const Signup = () => {
  const theme = useTheme();
  const styles = getStyles();
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onRegister } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

  // Create refs for the inputs
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  // Create states for the error messages
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const validateInput = () => {
    let isError = false;
    // Reset the error messages
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    // Check if the name is not empty
    if (!name.trim()) {
      setNameError('Name is required');
      isError = true;
    }

    // Check if the email is not empty and is valid
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isError = true;
    }

    // Check if the password is not empty and is at least 8 characters long
    if (!password || password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isError = true;
    }

    // Check if the confirm password matches the password
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isError = true;
    }
    return isError;
  };

  const handleSignup = () => {
    const error = validateInput();
    if (!error) onRegister(name, email, password);
  };
  return (
    <View>
      <Text style={[styles.textAlignCenter, styles.textContainer]} variant="displaySmall">
        Create New Account
      </Text>
      <View>
        <TextInput
          mode="outlined"
          label="Full Name"
          value={name}
          onChangeText={setName}
          left={<TextInput.Icon icon="account" />}
          onSubmitEditing={() => emailInputRef.current.focus()}
        />
        <HelperText type="error" visible={nameError}>
          {nameError}
        </HelperText>
      </View>
      <View>
        <TextInput
          mode="outlined"
          ref={emailInputRef}
          label="Email"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => passwordInputRef.current.focus()}
          left={<TextInput.Icon icon="email" />}
        />
        <HelperText type="error" visible={emailError}>
          {emailError}
        </HelperText>
      </View>

      <View>
        <TextInput
          mode="outlined"
          ref={passwordInputRef}
          label="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
          left={
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          }
        />
        <HelperText type="error" visible={passwordError}>
          {passwordError}
        </HelperText>
      </View>
      <View>
        <TextInput
          mode="outlined"
          ref={confirmPasswordInputRef}
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isCPasswordVisible}
          left={
            <TextInput.Icon
              icon={isCPasswordVisible ? 'eye' : 'eye-off'}
              onPress={() => setIsCPasswordVisible(!isCPasswordVisible)}
            />
          }
        />
        <HelperText type="error" visible={confirmPasswordError}>
          {confirmPasswordError}
        </HelperText>
      </View>
      <TouchableOpacity onPress={handleSignup} style={styles.outlineButton}>
        <Text style={{ color: theme.colors.onPrimary }}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.positionCenter}>
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
