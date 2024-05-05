import React from 'react';
import VTFAB from '../components/VTFAB/VTFAB';
import Profile from '../components/Profile/Profile';
import withErrorBoundary from '../components/ErrorBoundary/WithErrorBoundary';

const ProfileWithErrorBoundary = withErrorBoundary(Profile);

const profile = () => {
  return (
    <VTFAB>
      <ProfileWithErrorBoundary />
    </VTFAB>
  );
};
export default profile;
