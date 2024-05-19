import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import getStyles from './styles';
import commonStyles from '../../styles/common.style';
import { onRegister } from '../../store/reducers/authSlice';
import { AlertComponent } from '../../utils/utils';

const Signup = () => {
  const styles = { ...getStyles(), ...commonStyles() };
  const dispatch = useDispatch();
  const router = useRouter();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const [errors, setErrors] = useState(error);
  const nameInput = useInput('', (value) => (value.trim() ? null : 'Name is required'));
  const emailInput = useInput('', (value) =>
    value.trim() && /\S+@\S+\.\S+/.test(value) ? null : 'Please enter a valid email',
  );
  const passwordInput = useInput('', (value) =>
    value && value.length >= 8 ? null : 'Password must be at least 8 characters long',
  );
  const confirmPasswordInput = useInput('', (value) =>
    value === passwordInput.value ? null : 'Passwords do not match',
  );
  useEffect(() => {
    setErrors(error);
  }, [error]);

  const handleSignup = async () => {
    // Trigger validation for all input fields
    nameInput.onBlur();
    emailInput.onBlur();
    passwordInput.onBlur();
    confirmPasswordInput.onBlur();

    if (nameInput.value && emailInput.value && passwordInput.value) {
      dispatch(
        onRegister({
          fullName: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        }),
      );
      if (errors === 'Registered successfully! Please login to continue.') router.replace('/');
      // Clear input fields after successful signup
      nameInput.onChangeText('');
      emailInput.onChangeText('');
      passwordInput.onChangeText('');
      confirmPasswordInput.onChangeText('');
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Text style={[styles.textAlignCenter, styles.textContainer]} variant="displaySmall">
        Create New Account
      </Text>
      {AlertComponent(errors)}
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
        <Text style={styles.textWhite}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.positionCenter}>
        <Text>Already have an account? </Text>
        <Link replace href="/" asChild>
          <TouchableOpacity>
            <Text>Log in</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
