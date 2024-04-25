import React, { useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Avatar, Card, IconButton } from 'react-native-paper';
import commonStyles from '../styles/common.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

let person = {
  name: 'Pankaj Saini',
  email: 'abc@xyz.com',
  address: 'abcabcabcabc',
  contact: '1231231234',
};

const profile = () => {
  const classes = commonStyles();
  const [name, setName] = useState(person.name);
  const [address, setAddress] = useState(person.address);
  const [email, setEmail] = useState(person.email);
  const [contact, setContact] = useState(person.contact);
  const [enableEdit, setEnableEdit] = useState(true);

  const handleEdit = () => {
    setEnableEdit((state) => !state);
  };

  const saveEdit = () => {
    setName(person.name);
    setEmail(person.email);
    setContact(person.contact);
    setAddress(person.address);
    setEnableEdit((state) => !state);
  };

  const handleChance = (id, e) => {
    if (e && e !== '') {
      person = { ...person, [id]: e };
    }
  };

  return (
    <KeyboardAwareScrollView
      style={classes.profileContainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <Card style={classes.profileCard}>
        <Card.Content>
          <Text variant="titleLarge">{name}</Text>
          <Text variant="bodyMedium">Contact : {contact}</Text>
          <Text variant="bodyMedium">Email: {email}</Text>
        </Card.Content>
      </Card>

      <Card>
        <Card.Title
          title={name}
          subtitle={contact}
          left={(props) => <Avatar.Text {...props} label={name[0]} />}
          right={(props) =>
            enableEdit ? (
              <IconButton {...props} icon="pencil" onPress={handleEdit} />
            ) : (
              <IconButton {...props} icon="content-save-outline" onPress={saveEdit} />
            )
          }
        />
        <Card.Content>
          <TextInput
            mode="outlined"
            disabled={enableEdit}
            label="Name"
            defaultValue={name}
            onChangeText={(e) => handleChance('name', e)}
            style={classes.inputField}
          />
          <TextInput
            mode="outlined"
            disabled={enableEdit}
            label="Email"
            defaultValue={email}
            onChangeText={(e) => handleChance('email', e)}
            style={classes.inputField}
          />
          <TextInput
            mode="outlined"
            disabled={enableEdit}
            label="Contact"
            defaultValue={contact}
            onChangeText={(e) => handleChance('contact', e)}
            style={classes.inputField}
          />
          <TextInput
            mode="outlined"
            disabled={enableEdit}
            label="Address"
            defaultValue={address}
            onChangeText={(e) => handleChance('address', e)}
            style={classes.inputField}
          />
        </Card.Content>
      </Card>
    </KeyboardAwareScrollView>
  );
};

export default profile;
