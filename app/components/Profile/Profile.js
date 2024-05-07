import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from '../../styles/common.style';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import { AvatarText } from '../../utils/utils';
import { authActions } from '../../store/reducers/authSlice';

const profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [person, setPerson] = useState(userProfile);
  const classes = commonStyles();
  const phoneInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const [enableEdit, setEnableEdit] = useState(true);

  const nameInput = useInput(person?.fullName, (value) =>
    value.trim() ? null : 'Name is required',
  );
  const emailInput = useInput(person?.email, (value) =>
    value.trim() && /\S+@\S+\.\S+/.test(value) ? null : 'Please enter a valid email',
  );
  const phoneInput = useInput(person?.phoneNumber, (value) =>
    value && value.length >= 10 ? null : 'Please Enter Valid Mobile Number',
  );
  const addressInput = useInput(person?.address, (value) =>
    value && value.length >= 8 ? null : 'Please Enter Valid Address',
  );

  const handleEdit = () => {
    setEnableEdit((state) => !state);
  };
  const resetForm = () => {
    nameInput.reset(person?.fullName);
    emailInput.reset(person?.email);
    phoneInput.reset(person?.phoneNumber);
    addressInput.reset(person?.address);
    setEnableEdit((state) => !state);
  };

  const saveEdit = () => {
    nameInput.onBlur();
    emailInput.onBlur();
    phoneInput.onBlur();
    addressInput.onBlur();
    if (nameInput.value && emailInput.value && phoneInput.value && addressInput.value) {
      setPerson({
        name: nameInput.value,
        email: emailInput.value,
        contact: phoneInput.value,
        address: addressInput.value,
      });
      const userData = {
        fullName: nameInput.value,
        email: emailInput.value,
        phoneNumber: phoneInput.value,
        address: addressInput.value,
      };
      dispatch(authActions.updateUserProfile(userData));
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
          <Text variant="titleLarge">{person?.fullName}</Text>
          <Text variant="bodyMedium">Contact : {person?.phoneNumber}</Text>
          <Text variant="bodyMedium">Email: {person?.email}</Text>
        </Card.Content>
      </Card>

      <Card>
        <Card.Title
          title={person ? person.fullName : 'N/A'}
          subtitle={person ? person.phoneNumber : 'N/A'}
          left={(props) => AvatarText({ ...props, label: person?.fullName[0] })}
          right={(props) =>
            enableEdit ? (
              <IconButton {...props} icon="pencil" onPress={handleEdit} />
            ) : (
              <View style={[classes.flex1, classes.flexRow]}>
                <IconButton {...props} icon="content-save-outline" onPress={saveEdit} />
                <IconButton {...props} icon="close" onPress={resetForm} />
              </View>
            )
          }
        />
        <Card.Content>
          <VTTextInput
            label="Name"
            {...nameInput}
            disabled={enableEdit}
            onSubmitEditing={() => phoneInputRef.current.focus()}
            style={classes.inputField}
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
