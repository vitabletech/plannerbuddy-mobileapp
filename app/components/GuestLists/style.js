import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    address: {
      fontSize: 14,
    },
    avatar: {
      top: -15,
    },
    card: {
      backgroundColor: theme.colors.white,
      borderRadius: 18,
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 10,
    },
    cardContent: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: {
      backgroundColor: theme.colors.elevation.level0,
      marginRight: 4,
    },
    iconButtons: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    phone: {
      fontSize: 14,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 4,
    },
    textContent: {
      flex: 1,
      marginLeft: 16,
    },
  });
};

export default getStyles;
