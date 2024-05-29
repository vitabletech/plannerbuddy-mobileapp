import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatedFAB, Text, useTheme, Searchbar } from 'react-native-paper';
import GiftCard from './GiftCard';
import commonStyles from '../../styles/common.style';
import { Loader, endReached } from '../../utils/utils';
import { fetchGifts, giftsActions } from '../../store/reducers/giftSlice';
import getStyles from './styles';
import AddGiftModal from './AddGiftModal';

const GiftsHome = () => {
  const theme = useTheme();
  const styles = { ...getStyles(), ...commonStyles() };
  const dispatch = useDispatch();
  const [searchGift, setSearchGift] = useState('');
  const giftsList = useSelector((state) => state.gift.gifts);
  const status = useSelector((state) => state.gift.status);
  const totalPages = useSelector((state) => state.gift.totalPages);
  const pages = useSelector((state) => state.gift.page);
  const [page, setPage] = useState(pages);

  const viewModal = useSelector((state) => state.gift.showModal);
  useEffect(() => {
    dispatch(fetchGifts({ page }));
  }, [page]);

  useEffect(() => {
    if (searchGift === '') {
      dispatch(giftsActions.resetSearch());
      dispatch(giftsActions.setSearchGift({ searchGift: false }));
      setPage(1);
    } else if (searchGift.length >= 3) {
      dispatch(fetchGifts({ page: 1, searchGift }));
      dispatch(giftsActions.setSearchGift({ searchGift: !!searchGift }));
    }
  }, [searchGift]);

  const handleLoadMore = useCallback(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages]);

  const handleSearch = (searchQuery) => {
    setSearchGift(searchQuery);
  };
  const openDialog = () => dispatch(giftsActions.openDialog());
  return (
    <View style={styles.mainContainer}>
      {viewModal && <AddGiftModal />}
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchGift}
        style={styles.searchBar}
      />
      <FlatList
        data={giftsList}
        ListEmptyComponent={<Text style={styles?.centerTextLargeMarginTop}>No Gifts Found</Text>}
        renderItem={({ item }) => <GiftCard data={item} />}
        keyExtractor={(gift) => gift?.giftId?.toString()}
        onEndReached={searchGift === '' && handleLoadMore}
        ListFooterComponent={() =>
          page === totalPages ? endReached(styles.title) : status === 'loading' && Loader()
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
      <View style={styles.columnFlexOne}>
        <AnimatedFAB
          icon="gift"
          label="Add Gift"
          extended
          onPress={openDialog}
          visible
          animateFrom="right"
          iconMode="dynamic"
          style={styles.absolutePositionBottomRight}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );
};

export default GiftsHome;
