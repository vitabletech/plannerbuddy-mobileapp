import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const commonStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    FAB: {
      backgroundColor: theme.colors.onPrimary,
    },
    absolutePositionBottomRight: {
      alignSelf: 'flex-end',
      backgroundColor: theme.colors.onPrimary,
      bottom: 15,
      position: 'absolute',
      right: 15,
      width: 'auto',
    },
    alignItems_center: {
      alignItems: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: theme.colors.backdrop,
      borderRadius: 16,
      height: '100%',
      justifyContent: 'center',
      width: 50,
    },
    buttonImage: {
      height: '50%',
      tintColor: theme.colors.background,
      width: '50%',
    },
    centerContent: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    centerTextLargeMarginTop: {
      fontSize: 20,
      marginTop: '10%',
      textAlign: 'center',
    },
    columnFlexOne: {
      flex: 1,
      flexDirection: 'column',
      flexGrow: 1,
    },
    dialogButtons: {
      color: theme.colors.onTertiaryContainer,
    },
    divider: {
      height: 1,
      marginVertical: 10,
      width: '40%',
    },
    dividerContiner: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
    },
    flex1: {
      flex: 1,
    },
    flexEnd: {
      alignItems: 'flex-end',
    },
    flexRow: {
      flexDirection: 'row',
    },
    giftContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    giftSaveButton: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    giftToggle: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 15,
    },
    guestCardMargin: {
      backgroundColor: theme.colors.onTertiary,
      marginHorizontal: 20,
      marginVertical: 8,
    },
    guestCardRightButtonMargin: { marginRight: 10 },
    h100: {
      height: '100%',
    },
    hAuto: {
      height: 'auto',
    },
    inputField: {
      marginVertical: 10,
    },
    jstCenter: {
      justifyContent: 'center',
    },
    logo: {
      marginLeft: 70,
      marginVertical: 60,
      resizeMode: 'contain',
    },
    mainContainer: {
      backgroundColor: theme.colors.primaryContainer,
      flex: 1,
    },
    marginHorizontal: {
      marginHorizontal: 10,
    },
    mb10: {
      marginBottom: 10,
    },
    mr10: {
      marginRight: 10,
    },
    mrAuto: {
      marginRight: 'auto',
    },
    negativeMarginBold: {
      fontWeight: 'bold',
      marginBottom: -10,
    },
    paddingBottom: {
      paddingBottom: 150,
    },
    position_absolute: {
      position: 'absolute',
    },
    position_fixed: {
      position: 'fixed',
    },
    position_relative: {
      position: 'relative',
    },
    position_static: {
      position: 'static',
    },
    position_sticky: {
      position: 'sticky',
    },
    profileCard: {
      backgroundColor: theme.colors.onPrimary,
      marginVertical: 10,
    },
    profileContainer: {
      flex: 1,
      gap: 10,
      margin: 10,
    },
    searchBar: {
      marginVertical: 5,
    },
    searchContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      height: 50,
      justifyContent: 'center',
      padding: 5,
    },
    searchInput: {
      height: '100%',
      paddingHorizontal: 16,
      width: '100%',
    },
    searchWrapper: {
      alignItems: 'center',
      backgroundColor: theme.colors.backdrop,
      borderRadius: 16,
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      marginRight: 12,
    },
    signUpButton: {
      backgroundColor: theme.colors.primaryContainer,
      borderColor: theme.colors.primary,
      borderRadius: 8,
      borderWidth: 1,
      paddingHorizontal: 'auto',
      paddingVertical: 10,
    },
    textDecorationLine: {
      textDecorationLine: 'underline',
    },
    textWhite: { color: theme.colors.background },
    title: {
      alignSelf: 'center',
      textAlign: 'center',
    },
    w100: {
      width: '100%',
    },
  });
};
export default commonStyles;
