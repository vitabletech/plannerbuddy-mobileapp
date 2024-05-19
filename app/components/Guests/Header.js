import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Appbar, Searchbar } from 'react-native-paper';
import getStyles from './styles';

const Header = ({
  onSearch,
  isSelected,
  setSelectedContacts,
  saveList,
  showOnlySearchBar = true,
  totalContacts = 0,
}) => {
  const styles = getStyles();
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
    saveList();
  };

  return (
    <>
      {showOnlySearchBar && (
        <Appbar.Header style={styles.header}>
          <Appbar.Content title={`${isSelected} / ${totalContacts}`} titleStyle={styles.font15} />
          <Appbar.Action icon="content-save" onPress={() => onSave()} />
          <Appbar.Action icon="close" onPress={handleEditPress} />
        </Appbar.Header>
      )}
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearchChange}
        value={searchQuery}
        style={styles.searchBar}
      />
    </>
  );
};
Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isSelected: PropTypes.number.isRequired,
  setSelectedContacts: PropTypes.func.isRequired,
  saveList: PropTypes.func.isRequired,
  showOnlySearchBar: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  totalContacts: PropTypes.number,
};

export default Header;
