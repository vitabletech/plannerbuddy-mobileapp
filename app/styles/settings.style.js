import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    closeButton: {
      marginBottom: 10,
    },
    container: {
      backgroundColor: theme.colors.onPrimaryContainer,
      flex: 1,
      padding: 24,
    },
    contentContainer: {
      alignItems: 'center',
      flex: 1,
    },
    image: {
      alignSelf: 'center',
    },
  });
};
export default getStyles;
