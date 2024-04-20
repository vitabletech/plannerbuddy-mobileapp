import { View, SafeAreaView, ScrollView, Image, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import Signup from './components/Signup/Signup';

function signup() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Signup />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default signup;
