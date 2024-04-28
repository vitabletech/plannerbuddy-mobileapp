import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  const screen = Dimensions.get('window');
  const Height = screen.height;
  return StyleSheet.create({
    actionsContainer: {
      flex: 1,
      flexDirection: 'row',
      // alignItems: 'flex-start',
      // margin: 15,
      //   marginVertical: 10,
    },
    container: {
      backgroundColor: theme.colors.primaryContainer,
      flex: 1,
    },
    contentContainer: {
      flex: 1,
    },
    eventCard: {
      margin: 5,
    },
    eventTitle: {
      fontWeight: 'bold',
    },
    input: {
      marginVertical: 2,
      multiline: true,
      textAlignVertical: 'top',
    },
    locationContainer: {
      flexDirection: 'row',
      gap: 5,
      margin: 15,
    },
    locationImage: {
      marginLeft: '5%',
    },
    locationText: {
      position: 'relative',
      width: '80%',
    },
    button: {
      padding: 1,
      borderCurve: 5,
      backgroundColor: theme.colors.onPrimary,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      margin: 3,
      width: 'auto',
    },
  });
};
export default getStyles;
