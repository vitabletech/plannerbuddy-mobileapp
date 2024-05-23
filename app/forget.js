import React, { useRef } from 'react';
import { View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

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
      <View />
    </RBSheet>
  );
};

export default Forget;
