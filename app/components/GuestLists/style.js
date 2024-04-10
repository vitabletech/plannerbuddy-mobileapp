import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    itemSeparator: {
      backgroundColor: theme.colors.secondary,
      height: 1,
    },
  });
};
export default getStyles;
