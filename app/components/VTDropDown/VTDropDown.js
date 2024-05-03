import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import getStyles from './styles';

const VTDropDown = ({ label, items, ...props }) => {
  const styles = getStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <View style={styles.mrBottom}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        searchable
        placeholder={label}
        {...props}
      />
    </View>
  );
};

VTDropDown.defaultProps = {
  label: 'Select Event',
};

VTDropDown.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
};
export default VTDropDown;
