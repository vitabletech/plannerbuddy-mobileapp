/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../utils/customAxios';

// Define the async thunk
export const fetchGuest = createAsyncThunk(
  'guest/fetchGuest',
  async (page, { rejectWithValue }) => {
    try {
      const response = await customAxios.get('guest', {
        params: {
          page,
          limit: 10,
        },
      });
      return response;
    } catch (error) {
      console.error('error :: ', error);
      return rejectWithValue(error.response.data);
    }
  },
);

const guestSlice = createSlice({
  name: 'guest',
  initialState: {
    guests: [],
    status: 'idle',
    showModal: false,
    page: 1,
    totalPages: 0,
    totalData: 0,
    error: null,
  },
  reducers: {
    openDialog(state) {
      state.showModal = !state.showModal;
    },
    closeDialog(state) {
      state.showModal = !state.showModal;
    },
    addGuest(state, action) {
      state.guests = [{ ...action.payload.guest }, ...state.guests];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGuest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched guests to the array
        const usersData = action.payload.guests.map((guest) => ({
          id: guest.guestId,
          name: guest.name,
          email: guest.email,
          phone: guest.phoneNumber,
          address: guest.address,
        }));
        state.guests = state.guests.concat(usersData);
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
        state.page = action.payload.currentPage;
      })
      .addCase(fetchGuest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const guestActions = guestSlice.actions;
export default guestSlice;
