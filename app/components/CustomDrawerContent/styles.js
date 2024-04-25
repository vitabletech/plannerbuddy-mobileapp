import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    drawerHeader: {
      alignItems: 'center',
      height: 150,
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
    },
    footerText: {
      backgroundColor: theme.colors.primary,
      paddingLeft: 20,
      paddingRight: 20,
    },
    labelStyle: {
      fontWeight: '900',
      marginLeft: -16,
    },
  });
};
export default getStyles;
