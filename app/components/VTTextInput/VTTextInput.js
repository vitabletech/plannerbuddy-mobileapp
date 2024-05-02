import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

const VTTextInput = forwardRef(({ label, value, onChangeText, onBlur, error, ...props }, ref) => {
  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        ref={ref}
        {...props}
      />
      {error && (
        <HelperText type="error" visible={error}>
          {error}
        </HelperText>
      )}
    </View>
  );
});

VTTextInput.defaultProps = {
  onBlur: () => {},
  error: () => {},
};

VTTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
};
export default VTTextInput;
