import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
import getStyles from './styles';

const VTTextInput = forwardRef(
  ({ label, value, onChangeText, onBlur, error, style, ...props }, ref) => {
    const theme = useTheme();
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
          accessibilityLabel={label}
          accessible
          underlineColor="transparent"
          // error
          theme={{ colors: { primary: theme.colors.outline } }}
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
  error: false,
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
