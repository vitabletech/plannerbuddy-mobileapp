import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.secondaryContainer,
      borderRadius: 10,
      elevation: 5,
      marginBottom: 16,
      shadowColor: theme.colors.background,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      width: '100%',
    },
    cardContent: {
      padding: 16,
    },
    contact: {
      color: theme.colors.background,
      fontSize: 18,
      marginBottom: 4,
    },
    email: {
      color: theme.colors.background,
      fontSize: 14,
    },
    name: {
      color: theme.colors.background,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
  });
};
export default getStyles;
