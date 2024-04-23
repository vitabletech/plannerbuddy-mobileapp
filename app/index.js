import React from 'react';
import Login from './components/login/Login';
import VTBottomSheet from './components/CustomBottomSheet/VTBottomSheet';

const LoginScreen = () => <VTBottomSheet content={<Login />} />;

export default LoginScreen;
