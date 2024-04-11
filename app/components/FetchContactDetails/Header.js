import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Appbar, Searchbar } from 'react-native-paper';

const Header = ({ onSearch, onEdit, isSelected }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
      <Appbar.Header>
        <Appbar.Content title="Guest" />
        <Appbar.Action icon="magnify" onPress={() => setIsSearchVisible(!isSearchVisible)} />
        {isEditVisible ? (
          <Appbar.Action icon="close" onPress={handleEditPress} />
        ) : (
          <Appbar.Action icon="pencil" onPress={handleEditPress} />
        )}
        {isEditVisible && isSelected && (
          <Appbar.Action icon="content-save" onPress={() => onSave()} />
        )}
      </Appbar.Header>
      {isSearchVisible && (
        <Searchbar placeholder="Search" onChangeText={handleSearchChange} value={searchQuery} />
      )}
    </>
  );
};
Header.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  isSelected: PropTypes.number.isRequired,
};

export default Header;
