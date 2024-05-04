import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    mrBottom: {
      marginBottom: 10,
    },
    dropdown: {
      height: 50,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 3,
      paddingHorizontal: 8,
      marginVertical: 5,
    },
  });
};
export default getStyles;
