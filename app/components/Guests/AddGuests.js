import React, { useState, useRef, useCallback } from 'react';
import { View } from 'react-native';
import { useTheme, Text, TextInput, HelperText, Button, Card } from 'react-native-paper';
import commonStyles from '../../styles/common.style';
import getStyles from './styles';

const AddGuests = () => {
  const theme = useTheme();
  const styles = { ...getStyles(), ...commonStyles() };
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
    setError(errors);
    return Object.keys(errors).length > 0;
  };

  const handleAddGuests = useCallback(() => {
    const isError = validateInput();
    if (!isError) console.log('Add guest');
  }, [validateInput]);

  return (
    <View style={styles.mainContainer}>
      <Card>
        <Card.Content>
          <View>
            <TextInput
              mode="outlined"
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
              mode="outlined"
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
              mode="outlined"
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
              mode="outlined"
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
              mode="outlined"
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
        </Card.Content>
      </Card>
    </View>
  );
};

export default AddGuests;
