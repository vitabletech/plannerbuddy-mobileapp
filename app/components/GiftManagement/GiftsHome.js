import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatedFAB, Text } from 'react-native-paper';
import GiftCard from './GiftCard';
import commonStyles from '../../styles/common.style';

import { giftsActions } from '../../store/reducers/giftSlice';
import getStyles from './styles';
import AddGiftModal from './AddGiftModal';

const GiftsHome = () => {
  const styles = getStyles();
  const classes = commonStyles();
  const dispatch = useDispatch();
  const giftsList = useSelector((state) => state.gift.gifts);
  const viewModal = useSelector((state) => state.gift.showModal);

  const openDialog = () => dispatch(giftsActions.openDialog());
  return (
    <View style={classes.flex1}>
      {viewModal && <AddGiftModal />}
      <FlatList
        data={giftsList}
        ListEmptyComponent={<Text style={classes?.centerTextLargeMarginTop}>No Events Found</Text>}
        renderItem={({ item: gift }) => (
          <GiftCard
            key={gift.giftId}
            giftId={gift.giftId}
            guestId={gift.guestId}
            eventId={gift.eventId}
            amount={gift.amount}
            desc={gift.notes}
          />
        )}
        keyExtractor={(gift) => gift.giftId.toString()}
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
        />
      </View>
    </View>
  );
};

export default GiftsHome;
