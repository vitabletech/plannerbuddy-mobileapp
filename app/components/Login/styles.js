import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    forgotPasswordContainer: {
      marginVertical: 20,
    },
    image: {
      height: 100,
      resizeMode: 'contain',
      width: '100%',
    },
    outlineButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 4,
      borderWidth: 1,
      marginVertical: 8,
      padding: 12,
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
    signUpForget: { color: theme.colors.onTertiaryContainer, fontWeight: 'bold' },
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
