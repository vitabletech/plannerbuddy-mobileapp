import React, { useState, useRef } from 'react';
import {
  Text,
  Card,
  IconButton,
  Button,
  Dialog,
  useTheme,
  Avatar,
  Divider,
} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { Stack } from 'expo-router';
import { Alert, View } from 'react-native';
import commonStyles from '../../styles/common.style';
import VTTextInput from '../VTTextInput/VTTextInput';
import useInput from '../../hooks/useInput';
import { AlertComponent, IconComponent } from '../../utils/utils';
import {
  validatePassword,
  validateAddress,
  validateName,
  validatePhone,
} from '../../utils/validations';

import { onLogout, updateUserProfile } from '../../store/reducers/authSlice';
import { updateProfile, changePassword } from '../../utils/apiCalls';
import InputDialog from '../InputDialog/InputDialog';
import { DEFAULT_HEADER_ICON_SIZE } from '../../constants/constants';
import getStyles from './style';

const profile = () => {
  const theme = useTheme();
  const styles = getStyles();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [person, setPerson] = useState(userProfile);
  const classes = commonStyles();
  const phoneInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const [enableEdit, setEnableEdit] = useState(false);
  const [error, setError] = useState(null);
  const [updatedPassword, setUpdatedPassword] = useState(false);

  const currentPassword = useInput('', (value) =>
    value?.trim() ? null : 'Current Password is required',
  );

  const newPassword = useInput('', validatePassword);
  const nameInput = useInput(person?.fullName, validateName);
  const phoneInput = useInput(person?.phoneNumber, validatePhone);
  const addressInput = useInput(person?.address, validateAddress);

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
        setError('Profile Updated Successfully');
      });
      setEnableEdit((state) => !state);
    }
  };

  const logoutIcon = () =>
    IconComponent('MaterialIcons', 'logout', DEFAULT_HEADER_ICON_SIZE, theme.colors.white);

  const handleUpdateDialog = () => {
    setUpdatedPassword(true);
  };

  const handleCancel = () => {
    setUpdatedPassword(false);
  };

  const handleUpdatePassword = () => {
    currentPassword.onBlur();
    newPassword.onBlur();
    if (currentPassword.value && newPassword.value) {
      changePassword({
        oldPassword: currentPassword.value,
        password: newPassword.value,
      }).then((response) => {
        currentPassword.reset();
        newPassword.reset();
        Alert.alert(response.error ? 'Fail' : 'Success', response.message);
        setUpdatedPassword(false);
      });
    }
  };

  return (
    <View style={classes.mainContainer}>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.white,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.shadow,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },

          headerRight: () => {
            return <Button icon={logoutIcon} label="Logout" onPress={() => dispatch(onLogout())} />;
          },
        }}
      />
      {updatedPassword && (
        <InputDialog visible={updatedPassword} onDismiss={handleCancel}>
          <Dialog.Title>Change Password</Dialog.Title>

          <Dialog.Content>
            <VTTextInput label="Current Password" {...currentPassword} />
            <VTTextInput label="New Password" {...newPassword} />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={handleCancel}>
              <Text variant="labelLarge" style={classes.dialogButtons}>
                Cancel
              </Text>
            </Button>
            <Button onPress={handleUpdatePassword}>
              <Text variant="labelLarge" style={classes.dialogButtons}>
                Update
              </Text>
            </Button>
          </Dialog.Actions>
        </InputDialog>
      )}
      <KeyboardAwareScrollView
        style={classes.profileContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
      >
        {AlertComponent(error)}
        <Card style={classes.profileCard} elevation={2}>
          <Avatar.Text
            label={person?.fullName[0]}
            labelStyle={theme.colors.white}
            style={styles.AvatorIcon}
          />
          <Card.Title
            title={<Text variant="titleLarge">{person?.fullName}</Text>}
            titleStyle={styles.title}
          />
          <Card.Content>
            <Divider />
            <View style={styles.cardDetails}>
              <View style={styles.cardRow}>
                <IconButton icon="phone" size={20} />
                <Text style={styles.cardRowText} variant="bodyMedium">
                  {person?.phoneNumber || '---'}
                </Text>
              </View>
              <Divider />
              <View style={styles.cardRow}>
                <IconButton icon="email-outline" size={20} />
                <Text style={styles.cardRowText} variant="bodyMedium">
                  {person?.email}
                </Text>
              </View>
              <Divider />
              <View style={styles.cardRow}>
                <IconButton icon="map-marker" size={20} />
                <Text style={styles.cardRowText} variant="bodyMedium">
                  {person?.address || '---'}
                </Text>
              </View>
            </View>
            <Divider />
          </Card.Content>
        </Card>
        <Card.Actions>
          <Button style={classes.commonButton} onPress={handleEdit}>
            <Text variant="labelLarge" style={classes.textWhite}>
              Edit Profile
            </Text>
          </Button>
        </Card.Actions>

        <Card.Actions>
          <Button style={classes.commonButton} onPress={handleUpdateDialog}>
            <Text variant="labelLarge" style={classes.textWhite}>
              Update Password
            </Text>
          </Button>
        </Card.Actions>

        {enableEdit && (
          <InputDialog visible={enableEdit} onDismiss={() => setEnableEdit((state) => !state)}>
            <Dialog.Title>Edit Profile</Dialog.Title>
            <Dialog.Content>
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
    </View>
  );
};

export default profile;
