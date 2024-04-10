import React from 'react';
import PropTypes from 'prop-types';
import { Card, Text, Avatar } from 'react-native-paper';
import getStyles from './style';

const CardComponent = ({ title, count }) => {
  const styles = getStyles();
  return (
    <Card style={styles.borderRadius}>
      <Card.Content style={styles.content}>
        <Text style={styles.welcome}>
          <Avatar.Icon size={24} icon="folder" />
        </Text>
        <Text style={styles.name}>{title}</Text>
        <Text>{count}</Text>
      </Card.Content>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default CardComponent;
