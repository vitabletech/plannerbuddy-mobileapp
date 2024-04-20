import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { themes } from '../../theme/themes';

const getStyles = () => {
  const screen = Dimensions.get('window');
  const Height = screen.height;
  const theme = useTheme();
  return StyleSheet.create({
    borderRadius: {
      borderRadius: 0,
    },
    container: {
      flex: 1,
      position: 'relative',
    },
    content: {
      backgroundColor: theme.colors.primaryContainer,
    },
    flexBasis50: {
      flex: 1,
      flexBasis: '50%',
    },
    flexRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    name: {
      color: theme.colors.onPrimaryContainer,
    },
    rightStyle: {
      right: 40,
      top: 50,
    },
    surface: {
      backgroundColor: theme.colors.elevation.level0,
      height: Height * 0.3,
      marginTop: '15%',
      padding: 16,
      width: '100%',
    },
    titleStyle: {
      color: theme.colors.onPrimary,
      top: 50,
    },
    totalDiv: {
      borderRadius: 26,
      overflow: 'hidden',
    },
    welcomeContainer: {
      backgroundColor: theme.colors.primary,
      height: Height * 0.3,
      width: '100%',
    },
  });
};
export default getStyles;
