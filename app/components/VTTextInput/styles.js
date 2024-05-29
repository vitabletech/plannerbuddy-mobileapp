import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    input: {
      backgroundColor: theme.colors.surfaceDisabled,
      borderRadius: 8,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderWidth: 0,
      marginVertical: 5,
      multiline: true,
      textAlignVertical: 'top',
      width: 'auto',
    },
    mrBottom: {
      marginBottom: 10,
    },
    textInput: {
      marginVertical: 2,
      multiline: true,
      textAlignVertical: 'top',
      width: 'auto',
    },
  });
};
export default getStyles;
