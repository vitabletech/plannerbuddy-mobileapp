import React from 'react';
import { LogBox } from 'react-native';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import Login from './components/Login/Login';
import VTBottomSheet from './components/CustomBottomSheet/VTBottomSheet';

LogBox.ignoreLogs([/.*defaultProps.*/]);
registerTranslation('en', enGB);
const LoginScreen = () => <VTBottomSheet content={<Login />} />;

export default LoginScreen;
