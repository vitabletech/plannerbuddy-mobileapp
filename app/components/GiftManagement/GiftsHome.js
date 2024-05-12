import React from 'react';
import { ImageBackground, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatedFAB } from 'react-native-paper';
import { ScrollView } from 'react-native-virtualized-view';
import decoration from '../../assets/images/decoration.png';
import GiftCard from './GiftCard';

import { giftsActions } from '../../store/GiftContext';
import getStyles from './styles';
import AddGiftModal from './AddGiftModal';

const GiftsHome = () => {
  const styles = getStyles();
  const dispatch = useDispatch();
  const giftsList = useSelector((state) => state.gift.gifts);

  const viewModal = useSelector((state) => state.gift.showModal);

  const openDialog = () => dispatch(giftsActions.openDialog());
  return (
    <View style={{ flex: 1 }}>
      {viewModal && <AddGiftModal />}
      <ImageBackground source={decoration} resizeMode="cover">
        <ScrollView style={{ height: '100%' }}>
          {giftsList &&
            giftsList.map((gift) => (
              <GiftCard
                key={gift.giftId}
                giftId={gift.giftId}
                guestId={gift.guestId}
                eventId={gift.eventId}
                amount={gift.amount}
                desc={gift.notes}
              />
            ))}
        </ScrollView>
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
      </ImageBackground>
    </View>
  );
};

export default GiftsHome;
