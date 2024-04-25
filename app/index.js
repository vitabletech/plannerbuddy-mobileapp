import React from 'react';
import Login from './components/login/Login';
import VTBottomSheet from './components/CustomBottomSheet/VTBottomSheet';
import { enGB, registerTranslation } from 'react-native-paper-dates';
registerTranslation('en', enGB);

const LoginScreen = () => <VTBottomSheet content={<Login />} />;

export default LoginScreen;
