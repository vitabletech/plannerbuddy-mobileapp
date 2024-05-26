import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    loginText: { color: theme.colors.onTertiaryContainer, fontWeight: 'bold' },
    outlineButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      borderWidth: 1,
      marginTop: 8,
      padding: 8,
    },
    positionCenter: {
      alignItems: 'center',
      borderColor: theme.colors.primary,
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
    },
    textAlignCenter: {
      textAlign: 'center',
      width: '100%',
    },
    textContainer: {
      marginBottom: 20,
    },
    white: {
      color: theme.colors.white,
    },
  });
};
export default getStyles;
