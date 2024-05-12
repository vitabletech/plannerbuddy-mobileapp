/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const giftSlice = createSlice({
  name: 'gifts',
  initialState: {
    gifts: [],
    showModal: false,
  },
  reducers: {
    addGift(state, action) {
      state.gifts = [...new Set([...state.gifts, action.payload.gift])];
    },

    openDialog(state) {
      state.showModal = !state.showModal;
    },
    closeDialog(state) {
      state.showModal = !state.showModal;
    },
    removeGift(state, action) {
      state.gifts = state.gifts.filter((gift) => gift.giftId !== action.payload.id);
    },
  },
});

export const giftsActions = giftSlice.actions;
export default giftSlice;
