import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    card: {
      width: '100%',
      backgroundColor: theme.colors.secondaryContainer,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 16,
    },
    cardContent: {
      padding: 16,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 8,
    },
    contact: {
      fontSize: 18,
      color: '#666666',
      marginBottom: 4,
    },
    email: {
      fontSize: 14,
      color: '#999999',
    },
  });
};
export default getStyles;
