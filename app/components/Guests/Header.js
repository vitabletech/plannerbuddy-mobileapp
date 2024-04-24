import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Appbar, Searchbar } from 'react-native-paper';
import getStyles from './styles';

const Header = ({ onSearch, isSelected, setSelectedContacts }) => {
  const styles = getStyles();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };
  const handleEditPress = () => {
    setIsEditVisible(!isEditVisible);
    setSelectedContacts([]);
  };
  const onSave = () => {
    console.log('Save');
  };

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={`${isSelected} Selected`} />
        <Appbar.Action
          icon={isSearchVisible ? 'magnify-close' : 'magnify'}
          onPress={() => setIsSearchVisible(!isSearchVisible)}
        />
        {isSelected && <Appbar.Action icon="content-save" onPress={() => onSave()} />}
        {isSelected && <Appbar.Action icon="close" onPress={handleEditPress} />}
      </Appbar.Header>
      {isSearchVisible && (
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearchChange}
          value={searchQuery}
          style={styles.searchBar}
        />
      )}
    </>
  );
};
Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isSelected: PropTypes.number.isRequired,
  setSelectedContacts: PropTypes.func.isRequired,
};

export default Header;
