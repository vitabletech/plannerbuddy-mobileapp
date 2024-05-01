import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const WithErrorBoundary = (WrappedComponent) => {
  return (props) => (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

export default WithErrorBoundary;
