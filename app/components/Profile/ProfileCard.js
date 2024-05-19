import React from 'react';
import PropTypes from 'prop-types';
import { Card, Text } from 'react-native-paper';
import getStyles from './style';

const ProfileCard = ({ person }) => {
  const styles = getStyles();
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.name} variant="titleLarge">
          {person?.fullName}
        </Text>
        <Text style={styles.contact} variant="bodyMedium">
          Contact : {person?.phoneNumber}
        </Text>
        <Text style={styles.email} variant="bodyMedium">
          Email: {person?.email}
        </Text>
      </Card.Content>
    </Card>
  );
};

ProfileCard.propTypes = {
  person: PropTypes.shape({
    fullName: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default ProfileCard;
