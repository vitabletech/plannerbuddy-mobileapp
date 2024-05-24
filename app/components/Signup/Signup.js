import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import getStyles from './styles';
import commonStyles from '../../styles/common.style';
import { onRegister } from '../../utils/apiCalls';
import { validateEmail, validateName } from '../../utils/validations';

const Signup = () => {
  const styles = { ...getStyles(), ...commonStyles() };
  const router = useRouter();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);
  const nameInput = useInput('', validateName);
  const emailInput = useInput('', validateEmail);
  const passwordInput = useInput('', (value) =>
    value && value.length >= 8 ? null : 'Password must be at least 8 characters long',
  );
  const confirmPasswordInput = useInput('', (value) =>
    value === passwordInput.value ? null : 'Passwords do not match',
  );

  const handleSignup = async () => {
    // Trigger validation for all input fields
    nameInput.onBlur();
    emailInput.onBlur();
    passwordInput.onBlur();
    confirmPasswordInput.onBlur();

    if (
      nameInput.value &&
      emailInput.value &&
      passwordInput.value &&
      passwordInput.value === confirmPasswordInput.value
    ) {
      onRegister({
        fullName: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      })
        .then((response) => {
          if (response?.response?.data?.message) {
            Alert.alert('Error', response?.response?.data?.message);
            return;
          }
          Alert.alert('Success', 'Account created successfully!', [
            {
              text: 'Click to Login',
              onPress: () => {
                router.replace('/');
              },
            },
          ]);
        })
        .catch(() => {
          // Handle the error here
          Alert.alert('Error', 'An error occurred while registering.');
        });
      // Clear input fields after successful signup
      nameInput.onChangeText('');
      emailInput.onChangeText('');
      passwordInput.onChangeText('');
      confirmPasswordInput.onChangeText('');
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Text style={[styles.textAlignCenter, styles.textContainer]} variant="titleLarge">
        Join Planner Buddy Today
      </Text>
      <VTTextInput
        label="Full Name"
        {...nameInput}
        left={<TextInput.Icon icon="account" />}
        onSubmitEditing={() => emailInputRef.current.focus()}
      />
      <VTTextInput
        label="Email"
        ref={emailInputRef}
        {...emailInput}
        left={<TextInput.Icon icon="email" />}
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />
      <VTTextInput
        label="Enter Password"
        ref={passwordInputRef}
        secureTextEntry={!isPasswordVisible}
        {...passwordInput}
        left={
          <TextInput.Icon
            icon={isPasswordVisible ? 'eye' : 'eye-off'}
            onPress={() => setIsPasswordVisible((state) => !state)}
          />
        }
        onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
      />
      <VTTextInput
        label="Confirm Password"
        ref={confirmPasswordInputRef}
        secureTextEntry={!isCPasswordVisible}
        {...confirmPasswordInput}
        left={
          <TextInput.Icon
            icon={isCPasswordVisible ? 'eye' : 'eye-off'}
            onPress={() => setIsCPasswordVisible((state) => !state)}
          />
        }
      />
      <TouchableOpacity onPress={handleSignup} style={styles.outlineButton}>
        <Text style={styles.white}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.positionCenter}>
        <Text>Already have an account? </Text>
        <Link replace href="/" asChild>
          <TouchableOpacity>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
