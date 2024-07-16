import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

import VTBottomSheet from './components/CustomBottomSheet/VTBottomSheet';

LogBox.ignoreLogs([/.*defaultProps.*/]);
registerTranslation('en', enGB);

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const switchScreen = () => setIsLogin(!isLogin);
  return isLogin ? (
    <VTBottomSheet content={<Login switchScreen={switchScreen} />} />
  ) : (
    <VTBottomSheet content={<Signup switchScreen={switchScreen} />} />
  );
};

export default App;
