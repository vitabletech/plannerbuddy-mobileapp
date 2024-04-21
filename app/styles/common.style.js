import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const commonStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: theme.colors.backdrop,
      borderRadius: 16,
      height: '100%',
      justifyContent: 'center',
      width: 50,
    },
    buttonImage: {
      height: '50%',
      tintColor: theme.colors.background,
      width: '50%',
    },
    flex1: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
    },
    logo: {
      marginLeft: 70,
      marginVertical: 60,
      resizeMode: 'contain',
    },
    searchContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      height: 50,
      justifyContent: 'center',
      padding: 5,
    },
    searchInput: {
      height: '100%',
      paddingHorizontal: 16,
      width: '100%',
    },
    searchWrapper: {
      alignItems: 'center',
      backgroundColor: theme.colors.backdrop,
      borderRadius: 16,
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      marginRight: 12,
    },
    title: {
      alignSelf: 'center',
      textAlign: 'center',
    },
  });
};
export default commonStyles;
