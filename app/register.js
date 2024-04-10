import React from 'react';
import RegisterForm from './components/RegisterForm/RegisterForm';
import CustomBottomSheet from './components/CustomBottomSheet/CustomBottomSheet';

const Register = () => <CustomBottomSheet content={<RegisterForm />} />;

export default Register;
