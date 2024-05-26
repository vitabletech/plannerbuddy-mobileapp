import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    containerStyle: {
      flex: 1,
      margin: 20,
    },
    forgetPasswordButton: {
      backgroundColor: theme.colors.onPrimary,
      borderColor: theme.colors.primary,
      borderRadius: 20,
      borderWidth: 2,
      marginTop: 40,
      paddingHorizontal: 'auto',
      paddingVertical: 10,
    },
    forgotPasswordContainer: {
      marginVertical: 20,
    },
    gapStyle: { flex: 1, gap: 4, marginTop: 20 },
    image: {
      height: 100,
      resizeMode: 'contain',
      width: '100%',
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      marginTop: 10,
      paddingHorizontal: 'auto',
      paddingVertical: 10,
    },
    outlineButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderWidth: 1,
      marginVertical: 8,
    },
    positionCenter: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    privacyPolicy: { color: theme.colors.onTertiaryContainer, fontWeight: 'medium' },
    rowReverse: {
      flexDirection: 'row-reverse',
    },
    rowSpaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    signUpButton: {
      backgroundColor: theme.colors.primaryContainer,
      borderColor: theme.colors.primary,
      borderRadius: 20,
      borderWidth: 1,
      paddingHorizontal: 'auto',
      paddingVertical: 10,
    },
    textAlignCenter: {
      textAlign: 'center',
      width: '100%',
    },
    textContainer: {
      marginBottom: 20,
    },
  });
};
export default getStyles;
