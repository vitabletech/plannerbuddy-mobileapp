import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const commonStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    flex1: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      alignSelf: 'center',
      textAlign: 'center',
    },
  });
};
export default commonStyles;
