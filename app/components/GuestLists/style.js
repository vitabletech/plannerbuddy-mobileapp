import { StyleSheet } from 'react-native';

const getStyles = () =>
  StyleSheet.create({
    address: {
      color: 'gray',
      fontSize: 14,
    },
    avatar: {
      top: -15,
    },
    card: {
      borderRadius: 18,
      marginVertical: 8,
      paddingLeft: 8,
      marginHorizontal: 16,
      backgroundColor: 'white',
    },
    cardContent: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: {
      backgroundColor: 'transparent',
      marginRight: 4,
    },
    iconButtons: {
      alignItems: 'center',
      flexDirection: 'column',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    phone: {
      color: 'gray',
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

export default getStyles;
