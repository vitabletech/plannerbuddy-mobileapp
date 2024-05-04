import { StyleSheet } from 'react-native';

const getStyles = () => {
  return StyleSheet.create({
    input: {
      marginVertical: 2,
      multiline: true,
      textAlignVertical: 'top',
      width: 'auto',
    },
    mrBottom: {
      marginBottom: 10,
    },
  });
};
export default getStyles;
