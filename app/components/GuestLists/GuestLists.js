import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import UserDataList from './UserDataList';
import { API_URL } from '../../constants/constants';
import { Loader, ItemSeparatorComponent } from '../../utils/utils';
import commonStyles from '../../styles/common.style';
import getStyles from './style';

const GuestLists = () => {
  const classes = commonStyles();
  const styles = getStyles();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}users?skip=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, ...data.users]);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      setPage(users?.length);
    }
  }, [loading]);

  const renderItem = ({ item }) => <UserDataList userData={item} />;

  return (
    <View style={classes.flex1}>
      {users.length !== 0 && (
        <FlatList
          data={users}
          keyExtractor={(usersData) => `${usersData?.item?.id?.toString()}-${Math.random()}`}
          renderItem={(item) => renderItem(item)}
          ItemSeparatorComponent={() => ItemSeparatorComponent(styles.itemSeparator)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => loading && Loader()}
        />
      )}
    </View>
  );
};
export default GuestLists;
