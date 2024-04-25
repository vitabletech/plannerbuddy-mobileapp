import React from 'react';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import Login from './components/Login/Login';
import VTBottomSheet from './components/CustomBottomSheet/VTBottomSheet';

registerTranslation('en', enGB);

const LoginScreen = () => <VTBottomSheet content={<Login />} />;

export default LoginScreen;
