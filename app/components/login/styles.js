import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: theme.colors.onPrimary,
      borderRadius: 4,
      marginTop: 20,
      padding: 12,
    },
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      borderRadius: 15,
      paddingTop: 65,
    },
    header: {
      color: theme.colors.background,
      fontSize: 40,
      marginBottom: 10,
      textAlign: 'center',
    },
    image: {
      height: 100,
      resizeMode: 'contain',
      width: '100%',
    },
    outlineButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.elevation.level0,
      borderColor: theme.colors.onPrimaryContainer,
      borderRadius: 4,
      borderWidth: 1,
      marginVertical: 8,
      padding: 12,
    },

    subheader: {
      color: theme.colors.background,
      fontSize: 18,
      marginBottom: 40,
      textAlign: 'center',
    },
    input: {
      backgroundColor: theme.colors.elevation.level0,
      flex: 1,
    },
    icon: {
      height: 20,
      marginRight: 10,
      width: 20,
    },
    inputContainer: {
      alignItems: 'center',
      borderBottomColor: theme.colors.onTertiaryContainer,
      borderBottomWidth: 1,
      flexDirection: 'row',
      marginBottom: 20,
      paddingBottom: 5,
    },
    loginHeaderText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',

      // textAlign: 'center',
      // fontWeight: 'bold',
      // marginVertical: 15,
      // fontSize: "30",
      // fontWeight: '900',
      // color: "#343a40",
      // textAlign: 'center',
      // position: 'relative',
      // margin: 0,
      // padding: 0,
      // zIndex: 1,
      // fontFamily: theme.fonts.displayMedium
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
      marginVertical: 20,
    },
    forgotPasswordText: {
      color: theme.colors.background,
    },
  });
};
export default getStyles;
