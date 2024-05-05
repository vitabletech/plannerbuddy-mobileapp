import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    dropdown: {
      borderColor: theme.colors.primary,
      borderRadius: 3,
      borderWidth: 1,
      height: 50,
      marginVertical: 5,
      paddingHorizontal: 8,
    },
    mrBottom: {
      marginBottom: 10,
    },
  });
};
export default getStyles;
