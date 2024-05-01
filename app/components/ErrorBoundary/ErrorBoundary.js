import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { node, func } from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true, showToast: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // eslint-disable-next-line no-console
    console.warn(error, errorInfo);
  }

  render() {
    const { state, props } = this;
    const { hasError } = state;
    const { children, fallback } = props;
    if (hasError) {
      return fallback();
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: node.isRequired,
  fallback: func,
};

ErrorBoundary.defaultProps = {
  fallback: () => (
    <Card>
      <Card.Content>
        <Text>
          An error occurred. Please restart your application and try again. If the issue continues,
          kindly send an email to info@vitabletech.in to reach our staff.
        </Text>
        <Button onPress={() => Linking.openURL('mailto:info@vitabletech.in')}>Send Email</Button>
      </Card.Content>
    </Card>
  ),
};

export default ErrorBoundary;
