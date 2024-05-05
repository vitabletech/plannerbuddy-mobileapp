/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const guestSlice = createSlice({
  name: 'guest',
  initialState: {
    guests: [],
    showModal: false,
  },
  reducers: {
    openDialog(state) {
      state.showModal = !state.showModal;
    },
    closeDialog(state) {
      state.showModal = !state.showModal;
    },
    addGuest(state, action) {
      state.guests = [...state.guests, { ...action.payload.guest }];
    },
  },
});

export const guestActions = guestSlice.actions;
export default guestSlice;
