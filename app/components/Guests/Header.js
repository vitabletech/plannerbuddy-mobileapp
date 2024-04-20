import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Searchbar, Image, TextInput } from 'react-native';
import commonStyles from '../../styles/common.style';
import search from '../../assets/icons/search.png';
import edit from '../../assets/icons/edit.png';

const Header = ({ onSearch, onEdit, isSelected }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [isEditVisible, setIsEditVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const style = commonStyles();

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleEditPress = () => {
    setIsEditVisible(!isEditVisible);
    onEdit();
  };
  const onSave = () => {
    console.log('Save');
  };

  return (
    <>
      <View style={style.searchContainer}>
        <View style={style.searchWrapper}>
          <TextInput
            style={style.searchInput}
            onChangeText={(e) => (searchTerm = e)}
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

      {/* {isEditVisible && isSelected && (
          <TouchableOpacity icon="content-save" onPress={() => onSave()} />
        )} */}
      {/* {isSearchVisible && (
          <Searchbar placeholder="Search" onChangeText={handleSearchChange} value={searchQuery} />
        )} */}
    </>
  );
};
Header.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  isSelected: PropTypes.number.isRequired,
};

export default Header;
