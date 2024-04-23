import React, { useState, useRef, useCallback } from 'react';
import { View } from 'react-native';
import { useTheme, Text, TextInput, HelperText, Button, Modal } from 'react-native-paper';
import FetchContactDetails from './FetchContactDetails';
import getStyles from './styles';

const AddGuests = () => {
  const theme = useTheme();
  const styles = getStyles();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    tags: '',
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);

  // Create refs for the inputs
  const emailInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const tagsInputRef = useRef(null);

  const handleClearForm = useCallback(() => {
    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      address: '',
      tags: '',
    });
  }, []);

  const validateInput = () => {
    const errors = {};
    // Check if the name is not empty
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    // Check if the email is not empty and is valid
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    // Check if the password is not empty and is at least 8 characters long
    if (formData.address.trim() && formData.address.length < 8) {
      errors.address = 'Please Enter Valid Address';
    }

    // Check if the confirm password matches the password
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number Should not be empty';
    }
    console.log('errors', errors);
    setError(errors);
    return Object.keys(errors).length > 0;
  };

  const handleAddGuests = useCallback(() => {
    const isError = validateInput();
    if (!isError) console.log('Add guest');
  }, [validateInput]);

  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          <TextInput
            label="Guest Full Name"
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            left={<TextInput.Icon icon="account" />}
            onSubmitEditing={() => emailInputRef.current.focus()}
          />
          <HelperText type="error" visible={!!error.name}>
            {error.name}
          </HelperText>
          <TextInput
            ref={phoneNumberInputRef}
            label="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(text) => handleChange('phoneNumber', text)}
            onSubmitEditing={() => addressInputRef.current.focus()}
            left={<TextInput.Icon icon="phone" />}
          />
          <HelperText type="error" visible={!!error.phoneNumber}>
            {error.phoneNumber}
          </HelperText>
          <TextInput
            ref={emailInputRef}
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            onSubmitEditing={() => phoneNumberInputRef.current.focus()}
            left={<TextInput.Icon icon="email" />}
          />
          <HelperText type="error" visible={!!error.email}>
            {error.email}
          </HelperText>
          <TextInput
            ref={addressInputRef}
            label="Address"
            value={formData.address}
            onChangeText={(text) => handleChange('address', text)}
            onSubmitEditing={() => tagsInputRef.current.focus()}
            left={<TextInput.Icon icon="home" />}
          />
          <HelperText type="error" visible={!!error.address}>
            {error.address}
          </HelperText>

          <TextInput
            ref={tagsInputRef}
            label="Tags"
            value={formData.tags}
            onChangeText={(text) => handleChange('tags', text)}
            onSubmitEditing={handleAddGuests}
            left={<TextInput.Icon icon="tag" />}
          />
          <HelperText type="error" visible={!!error.tags}>
            {error.tags}
          </HelperText>
        </View>
        <View style={styles.justify}>
          <Button icon="delete" mode="contained" onPress={handleClearForm} style={styles.mr10}>
            <Text style={{ color: theme.colors.onPrimary }}>Clear</Text>
          </Button>
          <Button icon="content-save" mode="contained" onPress={handleAddGuests}>
            <Text style={{ color: theme.colors.onPrimary }}>Save Guests</Text>
          </Button>
        </View>
        <Button
          icon="account-sync"
          mode="contained-tonal"
          textColor={theme.colors.primary}
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.mainContainer}
        >
          <Text style={{ color: theme.colors.primary }}>Sync Guests From Contact</Text>
        </Button>
      </View>
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} style={styles.model}>
        <View style={styles.modalBackground}>
          <Button onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </Button>
          <FetchContactDetails />
        </View>
      </Modal>
    </>
  );
};

export default AddGuests;
