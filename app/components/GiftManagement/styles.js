import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    absolutePositionBottomRight: {
      alignSelf: 'flex-end',
      bottom: 45,
      position: 'absolute',
      right: 15,
      width: 'auto',
    },
    header: { borderRadius: 10, margin: 5 },
    info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    notes: { flexDirection: 'row', justifyContent: 'flex-start' },
    text: { alignSelf: 'center' },
    title: {
      fontSize: 20,
    },
  });
};
export default getStyles;
