import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 15,
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    createAccountContainer: {
      flex: 1,
      margin: 5,
    },
    divider: {
      borderBottomColor: theme.colors.onPrimary,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    forgotPasswordText: {
      color: theme.colors.background,
    },
    icon: {
      height: 20,
      marginRight: 10,
      width: 20,
    },
    input: {
      backgroundColor: theme.colors.elevation.level0,
      flex: 1,
    },
    inputContainer: {
      alignItems: 'center',
      borderBottomColor: theme.colors.onTertiaryContainer,
      borderBottomWidth: 1,
      flexDirection: 'row',
      marginBottom: 20,
      paddingBottom: 5,
    },
    loginButton: {
      alignItems: 'center',
      borderColor: theme.colors.primary,
      borderRadius: 500,
      borderWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    loginOptionText: {
      marginHorizontal: 20,
    },
    loginText: {
      color: theme.colors.primary,
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 10,
      marginVertical: 'auto',
    },
    signUpContainer: {
      alignItems: 'center',
      borderColor: theme.colors.primary,
      borderRadius: 500,
      borderWidth: 1,
      flexDirection: 'row',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    subtitle: {
      borderBottomColor: theme.colors.onTertiaryContainer,
      fontSize: 18,
      marginBottom: 30,
      textAlign: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
  });
};
export default getStyles;
