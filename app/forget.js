import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const Forget = () => {
  const refStandard = useRef();
  return (
    <RBSheet
      ref={refStandard}
      height={700}
      customStyles={{
        container: {
          backgroundColor: 'red',
        },
      }}
    >
      <View></View>
    </RBSheet>
  );
};

export default Forget;
