import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const screen = Dimensions.get('window');
  const Height = screen.height;
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    content: {
      backgroundColor: theme.colors.primaryContainer,
    },
    dashboard: { padding: 20 },
    flexBasis25: {
      flex: 1,
      flexBasis: '25%',
    },
    flexRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    name: {
      color: theme.colors.onPrimaryContainer,
    },
    positionCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightStyle: {
      right: 40,
      top: 70,
    },
    surfaceContainer: {
      backgroundColor: theme.colors.onPrimary,
      borderRadius: 20,
      paddingBottom: '5%',
      paddingTop: '5%',
    },

    titleStyle: {
      color: theme.colors.onPrimary,
      fontSize: 20,
      fontWeight: 'bold',
      top: 70,
    },
    welcomeContainer: {
      backgroundColor: theme.colors.primary,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      height: Height * 0.2,
      width: '100%',
    },
  });
};
export default getStyles;
