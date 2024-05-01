import React, { useState, useRef } from 'react';
import { Text, Avatar, Card, IconButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import commonStyles from '../styles/common.style';
import { fetchUserDetails } from '../utils/utils';
import VTTextInput from '../components/VTTextInput/VTTextInput';
import useInput from '../hooks/useInput';

const profile = () => {
  const person = fetchUserDetails();
  const classes = commonStyles();
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const [enableEdit, setEnableEdit] = useState(true);

  const nameInput = useInput(person.name, (value) => (value.trim() ? null : 'Name is required'));
  const emailInput = useInput(person.email, (value) =>
    value.trim() && /\S+@\S+\.\S+/.test(value) ? null : 'Please enter a valid email',
  );
  const phoneInput = useInput(person.contact, (value) =>
    value && value.length >= 10 ? null : 'Please Enter Valid Mobile Number',
  );
  const addressInput = useInput(person.address, (value) =>
    value && value.length >= 8 ? null : 'Please Enter Valid Address',
  );

  const handleEdit = () => {
    setEnableEdit((state) => !state);
  };
  const resetForm = () => {
    nameInput.reset(person.name);
    emailInput.reset(person.email);
    phoneInput.reset(person.contact);
    addressInput.reset(person.address);
    setEnableEdit((state) => !state);
  };

  const saveEdit = () => {
    nameInput.onBlur();
    emailInput.onBlur();
    phoneInput.onBlur();
    addressInput.onBlur();
    if (nameInput.value && emailInput.value && phoneInput.value && addressInput.value) {
      person.name = nameInput.value;
      person.email = emailInput.value;
      person.contact = phoneInput.value;
      person.address = addressInput.value;
      setEnableEdit((state) => !state);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={classes.profileContainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
    >
      <Card style={classes.profileCard}>
        <Card.Content>
          <Text variant="titleLarge">{person.name}</Text>
          <Text variant="bodyMedium">Contact : {person.contact}</Text>
          <Text variant="bodyMedium">Email: {person.email}</Text>
        </Card.Content>
      </Card>

      <Card>
        <Card.Title
          title={person.name}
          subtitle={person.contact}
          left={(props) => <Avatar.Text {...props} label={person.name[0]} />}
          right={(props) =>
            enableEdit ? (
              <IconButton {...props} icon="pencil" onPress={handleEdit} />
            ) : (
              <>
                <IconButton {...props} icon="close" onPress={resetForm} />
                <IconButton {...props} icon="content-save-outline" onPress={saveEdit} />
              </>
            )
          }
        />
        <Card.Content>
          <VTTextInput
            label="Name"
            {...nameInput}
            disabled={enableEdit}
            onSubmitEditing={() => emailInputRef.current.focus()}
            style={classes.inputField}
          />
          <VTTextInput
            label="Email"
            {...emailInput}
            disabled={enableEdit}
            onSubmitEditing={() => phoneInputRef.current.focus()}
            style={classes.inputField}
            ref={emailInputRef}
          />
          <VTTextInput
            label="Phone Number"
            {...phoneInput}
            disabled={enableEdit}
            onSubmitEditing={() => addressInputRef.current.focus()}
            style={classes.inputField}
            ref={phoneInputRef}
          />
          <VTTextInput
            label="Address"
            {...addressInput}
            disabled={enableEdit}
            style={classes.inputField}
            ref={addressInputRef}
          />
        </Card.Content>
      </Card>
    </KeyboardAwareScrollView>
  );
};

export default profile;
