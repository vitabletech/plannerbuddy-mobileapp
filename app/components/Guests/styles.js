import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const screenHeight = Dimensions.get('window').height;
  const theme = useTheme();
  return StyleSheet.create({
    font15: {
      fontSize: 15,
    },
    header: {
      marginTop: -40,
    },
    justify: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    mainContainer: {
      marginBottom: 20,
      marginTop: 20,
    },
    modalBackground: {
      backgroundColor: theme.colors.background,
      height: screenHeight * 0.8,
    },
    model: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    outlineButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 4,
      borderWidth: 1,
      marginVertical: 8,
      padding: 12,
    },
    positionCenter: {
      alignItems: 'center',
      borderColor: theme.colors.primary,
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
    },
    textAlignCenter: {
      textAlign: 'center',
      width: '100%',
    },
  });
};
export default getStyles;
