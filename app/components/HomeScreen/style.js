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
    carousel: {
      borderRadius: 20,
    },
    carouselCard: {
      backgroundColor: theme.colors.secondaryContainer,
    },
    container: {
      backgroundColor: theme.colors.primaryContainer,
      flex: 1,
      position: 'relative',
    },
    content: {
      backgroundColor: theme.colors.primaryContainer,
    },
    dashboard: {
      marginTop: 10,
      padding: 10,
    },
    event_title: {
      marginBottom: 20,
      marginTop: 10,
      textTransform: 'capitalize',
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
    guestLabel: { color: theme.colors.white, marginLeft: 10 },
    image: {
      bottom: 0,
      position: 'absolute',
      right: '10%',
    },
    imageGuest: {
      position: 'absolute',
      right: '30%',
      top: 25,
    },
    name: {
      color: theme.colors.onSurface,
    },
    positionCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    recentEventsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      backgroundColor: theme.colors.background,
      borderRadius: 20,
      paddingBottom: '5%',
      paddingTop: '5%',
    },
    templateContainer: {
      marginTop: '-20%',
    },
    titleStyle: {
      color: theme.colors.white,
      marginTop: '25%',
    },
    totalGuest: {
      borderRadius: 20,
      marginHorizontal: -10,
      padding: '5%',
    },
    viewAll: {
      color: theme.colors.primary,
    },
    welcomeContainer: {
      backgroundColor: theme.colors.primary,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      height: Height * 0.2,
      marginBottom: 10,
      width: '100%',
    },
  });
};
export default getStyles;
