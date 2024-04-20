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
    logo: {
      marginLeft: 70,
      marginVertical: 60,
      resizeMode: 'contain',
    },
    title: {
      alignSelf: 'center',
      textAlign: 'center',
    },
    button: {
      width: 50,
      height: '100%',
      backgroundColor: theme.colors.backdrop,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonImage: {
      width: '50%',
      height: '50%',
      tintColor: theme.colors.background,
    },
    searchContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 5,
      height: 50,
      backgroundColor: theme.colors.primary,
    },
    searchWrapper: {
      flex: 1,
      backgroundColor: theme.colors.backdrop,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      height: '100%',
    },
    searchInput: {
      width: '100%',
      height: '100%',
      paddingHorizontal: 16,
    },
    skipoutlineButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.elevation.level0,
      borderColor: theme.colors.onPrimary,
      borderRadius: 20,
      borderWidth: 2,
      marginVertical: 10,
      padding: 12,
      shadowColor: 'black',
    },
  });
};
export default commonStyles;
