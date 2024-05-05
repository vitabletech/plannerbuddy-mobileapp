import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useTheme, Text, TextInput, Button, Card, Dialog } from 'react-native-paper';
import commonStyles from '../../styles/common.style';
import getStyles from './styles';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';

const AddGuests = ({ nameInput, phoneInput, addressInput, emailInput }) => {
  // Create refs for the inputs
  const emailInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);
  const addressInputRef = useRef(null);

  return (
    <>
      <VTTextInput
        label="Guest Full Name"
        {...nameInput}
        left={<TextInput.Icon icon="account" />}
        onSubmitEditing={() => emailInputRef.current.focus()}
      />
      <VTTextInput
        label="Phone Number"
        ref={phoneNumberInputRef}
        {...phoneInput}
        left={<TextInput.Icon icon="phone" />}
        onSubmitEditing={() => addressInputRef.current.focus()}
      />
      <VTTextInput
        label="Email"
        ref={emailInputRef}
        {...emailInput}
        left={<TextInput.Icon icon="email" />}
        onSubmitEditing={() => phoneNumberInputRef.current.focus()}
      />
      <VTTextInput
        label="Address"
        ref={phoneNumberInputRef}
        {...addressInput}
        left={<TextInput.Icon icon="home" />}
      />
    </>
  );
};

export default AddGuests;
