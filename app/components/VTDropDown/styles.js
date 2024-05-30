import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    containerStyle: {
      backgroundColor: theme.colors.inverseOnSurface,
    },
    dropdown: {
      borderColor: theme.colors.onSurface,
      borderRadius: 3,
      borderWidth: 1,
      height: 50,
      marginVertical: 5,
      paddingHorizontal: 8,
    },
    error: {
      color: theme.colors.error,
      fontSize: 12,
      marginLeft: 5,
    },
    inputSearchStyle: { color: theme.colors.onSurface },
    mrBottom: {
      marginBottom: 10,
    },
    placeholderStyle: {
      color: theme.colors.onSurface,
    },
    selectedTextStyle: { color: theme.colors.onSurface },
  });
};
export default getStyles;
