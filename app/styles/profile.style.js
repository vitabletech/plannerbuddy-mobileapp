import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

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
    },
    containers: {
      flex: 1,
      padding: 16,
    },
    content: {
      marginLeft: 16,
    },
    eventDetails: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16,
    },
    eventLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      width: '50%',
    },
    eventValue: {
      fontSize: 14,
      textAlign: 'right',
      width: '50%',
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    name: {
      fontSize: 14,
    },
    surface: {
      backgroundColor: theme.colors.elevation.level0,
      height: Height * 0.3,
      marginTop: '15%',
      padding: 16,
      width: '100%',
    },
    welcome: {
      fontSize: 16,
    },
    welcomeContainer: {
      backgroundColor: theme.colors.onPrimaryContainer,
      height: Height * 0.3,
      width: '100%',
    },
  });
};
export default getStyles;
