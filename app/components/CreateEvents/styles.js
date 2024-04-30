import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    actionsContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    button: {
      backgroundColor: theme.colors.onPrimary,
      borderColor: theme.colors.primary,
      borderCurve: 5,
      borderWidth: 1,
      margin: 3,
      padding: 1,
      width: 'auto',
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
  });
};
export default getStyles;
