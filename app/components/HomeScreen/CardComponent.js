import React from 'react';
import PropTypes from 'prop-types';
import { Card, Text, Avatar } from 'react-native-paper';
import getStyles from './style';

const CardComponent = ({ title }) => {
  const styles = getStyles();
  return (
    <Card style={styles.borderRadius}>
      <Card.Content>
        <Text style={styles.welcome}>
          <Avatar.Icon size={24} icon="folder" />
        </Text>
        <Text style={styles.name}>{title}</Text>
      </Card.Content>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CardComponent;
