import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
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
  });
};
export default getStyles;
