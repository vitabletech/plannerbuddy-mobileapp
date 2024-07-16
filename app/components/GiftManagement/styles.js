import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    header: { borderRadius: 10, margin: 5 },
    info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    isYourGift: { backgroundColor: theme.colors.elevation.level0 },
    notes: { flexDirection: 'row', justifyContent: 'flex-start' },
    text: { alignSelf: 'center' },
    title: {
      fontSize: 20,
    },
  });
};
export default getStyles;
