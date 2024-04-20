import { useState, useRef } from 'react';
import { View, SafeAreaView, ScrollView, Image, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import commonStyles from './styles/common.style';

import Signup from './components/Signup/Signup';
import Login from './components/login/Login';

import logo from './assets/Logo.png';
import { useTheme } from 'react-native-paper';
import { AuthProvider } from './store/AuthContext';
import { useGlobal } from './store/globalContext';

const Home = () => {
  const router = useRouter();
  const styles = commonStyles();
  const theme = useTheme();
  const { initial } = useGlobal();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Image source={logo} style={styles.logo} width={100} height={100} />
          {initial === 'login' && <Login />}
          {initial === 'signup' && <Signup />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
