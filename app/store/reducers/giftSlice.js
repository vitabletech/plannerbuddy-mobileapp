/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../../utils/customAxios';

// Define the async thunk
export const fetchGifts = createAsyncThunk(
  'gifts/fetchGifts',
  async (queryData, { rejectWithValue }) => {
    const { page, searchGift } = queryData;
    const params = {
      page,
      limit: 50,
    };
    if (searchGift) {
      params.filter = JSON.stringify({ note: searchGift });
    }
    try {
      const response = await customAxios.get('gift', { params });
      return response;
    } catch (error) {
      const Error = error?.response?.data ? rejectWithValue(error.response.data) : error;
      return rejectWithValue(Error);
    }
  },
);

const giftSlice = createSlice({
  name: 'gifts',
  initialState: {
    gifts: [],
    showModal: false,
    status: 'idle',
    page: 1,
    totalPages: 0,
    totalData: 0,
    error: null,
    searchGifts: false,
  },
  reducers: {
    addGift(state, action) {
      state.gifts = [...new Set([action.payload.gift, ...state.gifts])];
    },
    openDialog(state) {
      state.showModal = !state.showModal;
    },
    closeDialog(state) {
      state.showModal = !state.showModal;
    },
    removeGift(state, action) {
      state.gifts = state.gifts.filter((gift) => gift.giftId !== action.payload.giftId);
    },
    resetSearch(state) {
      state.gifts = [];
    },
    setSearchGift(state, action) {
      state.searchGifts = action.payload.searchGift;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGifts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (!action?.payload?.eventGifts) return;
        state.error = null;
        state.gifts = state.searchGifts
          ? action?.payload?.eventGifts
          : state.gifts.concat(action?.payload?.eventGifts);
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
        state.page = action.payload.currentPage;
      })
      .addCase(fetchGifts.rejected, (state, action) => {
        state.status = 'failed';
        if (state.searchGifts) state.gifts = [];
        if (action?.payload?.message) {
          state.error = action?.payload?.message;
        } else if (action?.error?.message) {
          state.error = action.error.message;
        } else {
          state.error = 'Something Went Wrong! Please try again later.';
        }
      });
  },
});

export const giftsActions = giftSlice.actions;
export default giftSlice;
