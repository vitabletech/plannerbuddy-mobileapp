import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import getStyles from './styles';

const VTTextInput = forwardRef(
  ({ label, value, onChangeText, onBlur, error, style, ...props }, ref) => {
    const styles = getStyles();
    return (
      <View>
        <TextInput
          style={style === undefined ? styles.input : styles.textInput}
          mode="flat"
          label={label}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          ref={ref}
          {...props}
          autoCapitalize="none"
        />
        {error && (
          <HelperText type="error" visible={error}>
            {error}
          </HelperText>
        )}
      </View>
    );
  },
);

VTTextInput.defaultProps = {
  onBlur: () => {},
  error: 'Field is required',
  onChangeText: () => {},
  label: 'Default Label',
  value: '',
};

VTTextInput.defaultProps = {
  style: undefined,
};
VTTextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
export default VTTextInput;
