import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  const screen = Dimensions.get('window');
  const Height = screen.height;
  return StyleSheet.create({
    bottomSheet: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    container: {
      backgroundColor: theme.colors.primary,
      flex: 1,
      justifyContent: 'flex-end',
    },
    content: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    image: {
      alignSelf: 'center',
      height: Height * 0.2,
    },
    imageContainer: {
      height: Height * 0.2,
    },
  });
};
export default getStyles;
