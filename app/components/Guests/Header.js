import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Image, TextInput } from 'react-native';
import commonStyles from '../../styles/common.style';
import search from '../../assets/icons/search.png';
import edit from '../../assets/icons/edit.png';

const Header = ({ onEdit, onSearch, isSelected }) => {
  const [isEditVisible, setIsEditVisible] = useState(true);
  const style = commonStyles();
  console.log('isSelected ::', isSelected);
  console.log('onSearch ::', onSearch);

  const handleEditPress = () => {
    setIsEditVisible(!isEditVisible);
    onEdit();
  };

  return (
    <View style={style.searchContainer}>
      <View style={style.searchWrapper}>
        <TextInput
          style={style.searchInput}
          placeholder="What are you looking for?"
          placeholderTextColor="grey"
        />
      </View>

      {isEditVisible ? (
        <TouchableOpacity style={style.button} onPress={handleEditPress}>
          <Image source={search} resizeMode="contain" style={style.buttonImage} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={style.button} onPress={handleEditPress}>
          <Image source={edit} resizeMode="contain" style={style.buttonImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};
Header.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  isSelected: PropTypes.number.isRequired,
};

export default Header;
