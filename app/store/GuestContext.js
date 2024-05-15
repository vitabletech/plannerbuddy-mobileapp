/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../utils/customAxios';

// Define the async thunk
export const fetchGuest = createAsyncThunk(
  'guest/fetchGuest',
  async (queryData, { rejectWithValue }) => {
    const { page, searchGuest } = queryData;
    const params = {
      page,
      limit: 50,
    };
    if (searchGuest) {
      params.filter = JSON.stringify({ name: searchGuest });
    }
    try {
      const response = await customAxios.get('guest', { params });
      return response;
    } catch (error) {
      const Error = error?.response?.data ? rejectWithValue(error.response.data) : error;
      return rejectWithValue(Error);
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
    searchGuests: false,
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
      state.totalData += 1;
    },
    resetSearch(state) {
      state.guests = [];
    },
    setSearchGuest(state, action) {
      state.searchGuests = action.payload.searchGuests;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGuest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (!action?.payload?.guests) return;
        // Add any fetched guests to the array
        const usersData = action.payload.guests.map((guest) => ({
          id: guest.guestId,
          name: guest.name,
          email: guest.email,
          phone: guest.phoneNumber,
          address: guest.address,
        }));
        state.error = null;
        state.guests = state.searchGuests ? usersData : state.guests.concat(usersData);
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
        state.page = action.payload.currentPage;
      })
      .addCase(fetchGuest.rejected, (state, action) => {
        state.status = 'failed';
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

export const guestActions = guestSlice.actions;
export default guestSlice;
