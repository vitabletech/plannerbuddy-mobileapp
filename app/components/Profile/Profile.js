import React, { useState, useRef } from 'react';
import { Text, Card, IconButton, Button, Dialog } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from '../../styles/common.style';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import { AlertComponent, Loader } from '../../utils/utils';
import { updateUserProfile } from '../../store/reducers/authSlice';
import { updateProfile } from '../../utils/apiCalls';
import InputDialog from '../InputDialog/InputDialog';

const profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [person, setPerson] = useState(userProfile);
  const classes = commonStyles();
  const phoneInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const [enableEdit, setEnableEdit] = useState(false);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const nameInput = useInput(person?.fullName, (value) =>
    value.trim() ? null : 'Name is required',
  );
  const phoneInput = useInput(person?.phoneNumber, (value) =>
    value && value.length >= 10 ? null : 'Please Enter Valid Mobile Number',
  );
  const addressInput = useInput(person?.address, (value) =>
    value.trim() ? null : 'Please Enter Valid Address',
  );

  const handleEdit = () => {
    setEnableEdit((state) => !state);
  };
  const resetForm = () => {
    nameInput.reset(person?.fullName);
    phoneInput.reset(person?.phoneNumber);
    addressInput.reset(person?.address);
    setEnableEdit((state) => !state);
  };

  const saveEdit = () => {
    setLoader(true);
    nameInput.onBlur();
    phoneInput.onBlur();
    addressInput.onBlur();
    if (nameInput.value && phoneInput.value && addressInput.value) {
      const userData = {
        fullName: nameInput.value,
        phoneNumber: phoneInput.value,
        address: addressInput.value,
      };
      updateProfile(userData).then((response) => {
        if (response.error) {
          setError(response.message);
          return;
        }
        setPerson({ ...userData, email: person?.email, accessToken: person?.accessToken });
        dispatch(
          updateUserProfile({
            ...userData,
            email: person?.email,
            accessToken: person?.accessToken,
          }),
        );
        setLoader(false);
        setError('Profile Updated Successfully');
      });
      setEnableEdit((state) => !state);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={classes.profileContainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
    >
      {AlertComponent(error)}
      <Card style={classes.profileCard}>
        <Card.Title
          title={person?.fullName}
          subtitle={`Contact : ${person?.phoneNumber}`}
          right={(props) => <IconButton {...props} size={25} icon="pencil" onPress={handleEdit} />}
        />
        <Card.Content>
          <Text variant="bodyMedium">Email: {person?.email}</Text>
        </Card.Content>
      </Card>

      {enableEdit && (
        <InputDialog visible={enableEdit} onDismiss={() => setEnableEdit((state) => !state)}>
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Content>
            {loader && Loader()}
            <VTTextInput
              label="Name"
              {...nameInput}
              disabled={!enableEdit}
              onSubmitEditing={() => phoneInputRef.current.focus()}
              style={classes.inputField}
            />
            <VTTextInput
              label="Phone Number"
              {...phoneInput}
              disabled={!enableEdit}
              onSubmitEditing={() => addressInputRef.current.focus()}
              style={classes.inputField}
              ref={phoneInputRef}
              keyboardType="numeric"
            />
            <VTTextInput
              label="Address"
              {...addressInput}
              disabled={!enableEdit}
              style={classes.inputField}
              ref={addressInputRef}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={resetForm}>Cancel</Button>
            <Button onPress={saveEdit}>Save</Button>
          </Dialog.Actions>
        </InputDialog>
      )}
    </KeyboardAwareScrollView>
  );
};

export default profile;
