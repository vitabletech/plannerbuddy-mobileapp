import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const screen = Dimensions.get('window');
  const Height = screen.height;
  const theme = useTheme();
  return StyleSheet.create({
    card: {
      marginRight: 20,
      width: 300,
    },
    cardDefaultHeight: {
      marginVertical: 10,
    },
    container: {
      flex: 1,
      position: 'relative',
    },
    content: {
      backgroundColor: theme.colors.primaryContainer,
    },
    dashboard: {
      marginBottom: '-3%',
      marginTop: 10,
      padding: 10,
    },
    event_title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    flexBasis25: {
      flex: 1,
      flexBasis: '25%',
    },
    flexRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
    },
    guestAddMore: { top: 10, zIndex: 1 },
    guestContainer: {
      marginTop: '-20%',
      padding: 20,
    },
    guestLabel: { color: theme.colors.background, marginLeft: 10 },
    name: {
      color: theme.colors.onPrimaryContainer,
    },
    positionCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    recentEventsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    recentEventsHeadingText: {
      fontSize: 24,
      fontWeight: 'bold',
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
    templateContainer: {
      marginTop: '-20%',
    },
    titleStyle: {
      color: theme.colors.onPrimary,
      fontSize: 20,
      fontWeight: 'bold',
      top: 70,
    },
    totalGuest: {
      borderRadius: 20,
      marginHorizontal: -10,
      padding: '5%',
    },
    welcomeContainer: {
      backgroundColor: theme.colors.primary,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      height: Height * 0.2,
      marginBottom: '-3%',
      width: '100%',
    },
  });
};
export default getStyles;
