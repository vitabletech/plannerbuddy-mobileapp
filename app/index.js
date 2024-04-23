import React from 'react';
import Login from './components/Login/Login';
import VTBottomSheet from './components/CustomBottomSheet/VTBottomSheet';

const LoginScreen = () => <VTBottomSheet content={<Login />} />;

export default LoginScreen;
